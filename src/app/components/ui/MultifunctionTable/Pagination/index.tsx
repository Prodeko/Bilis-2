import type { Dispatch, SetStateAction } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

import type { Table as ReactTable } from "@tanstack/react-table";

import { PaginationButton } from "./PaginationButton";
import { PaginationInput } from "./PaginationInput";

interface Props<Schema> {
  table: ReactTable<Schema>;
  displayState: number | string;
  setDisplayState: Dispatch<SetStateAction<number | string>>;
}

/**
 * The logic here is quite fragile because we have separate states for the actual table pagination index and the index that is displayed in the input box. This should be simplified if possible, but small changes right now will likely break the whole logic.
 *
 * Most of the complexity comes from the fact that the table pagination is 0-indexed but the displayed input index is 1-indexed.
 * So that's why we add +1 to "setDisplayState" function.
 */
export const Pagination = <Schema extends object>({
  table,
  setDisplayState,
  displayState,
}: Props<Schema>) => {
  const currentPaginationState = table.getState().pagination.pageIndex;

  return (
    <div className="mx-auto flex w-full items-center justify-center gap-4 bg-neutral-800 p-6">
      <PaginationButton
        Icon={FiChevronsLeft}
        onClick={() => {
          table.setPageIndex(0);
          setDisplayState(1);
        }}
        disabled={!table.getCanPreviousPage()}
      />
      <PaginationButton
        Icon={FiChevronLeft}
        onClick={() => {
          table.previousPage();
          setDisplayState(currentPaginationState);
        }}
        disabled={!table.getCanPreviousPage()}
      />
      <PaginationInput
        onChange={(e) => {
          const value = e.target.value;
          if (!value) setDisplayState(value);
          else {
            const maxLimitedValue = Math.min(
              Number(value),
              table.getPageCount(),
            );
            table.setPageIndex(maxLimitedValue - 1);
            setDisplayState(maxLimitedValue);
          }
        }}
        onBlur={() => setDisplayState(currentPaginationState + 1)}
        value={displayState}
      />
      <PaginationButton
        Icon={FiChevronRight}
        onClick={() => {
          table.nextPage();
          setDisplayState(currentPaginationState + 2);
        }}
        disabled={!table.getCanNextPage()}
      />
      <PaginationButton
        Icon={FiChevronsRight}
        onClick={() => {
          table.setPageIndex(table.getPageCount() - 1);
          setDisplayState(table.getPageCount());
        }}
        disabled={!table.getCanNextPage()}
      />
    </div>
  );
};
