import type { Dispatch, SetStateAction } from "react";

import type { Column, Table as ReactTable } from "@tanstack/react-table";

import { SelectFilter } from "./SelectFilter";

interface Props {
  column: Column<any, any>;
  table: ReactTable<any>;
  setDisplayState: Dispatch<SetStateAction<number | string>>;
}

export const Filter = ({ column, table, setDisplayState }: Props) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  if (typeof firstValue === "number") {
    return (
      <div className="flex w-full justify-between divide-[1px] divide-neutral-700 overflow-hidden">
        <input
          type="number"
          inputMode="numeric"
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(e) => {
            column.setFilterValue((old: [number, number]) => [
              e.target.value,
              old?.[1],
            ]);
            setDisplayState(1);
          }}
          placeholder="Min"
          className="w-full grow border border-neutral-700 bg-neutral-600 p-3 text-lg font-normal text-neutral-200 outline-none placeholder:text-neutral-800 "
        />
        <input
          type="number"
          inputMode="numeric"
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(e) => {
            column.setFilterValue((old: [number, number]) => [
              old?.[0],
              e.target.value,
            ]);
            setDisplayState(1);
          }}
          placeholder="Max"
          className="w-full grow border border-neutral-700 bg-neutral-600 p-3 text-lg font-normal text-neutral-200 outline-none placeholder:text-neutral-800 "
        />
      </div>
    );
  }
  if (typeof firstValue === "string" && ["💩", " "].includes(firstValue)) {
    return <SelectFilter column={column} setDisplayState={setDisplayState} />;
  }
  if (typeof firstValue === "string") {
    return (
      <input
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(e) => {
          column.setFilterValue(e.target.value);
          setDisplayState(1);
        }}
        placeholder="Search..."
        className="w-full border border-neutral-700 bg-neutral-600 p-3 text-lg font-normal text-neutral-200 outline-none placeholder:text-neutral-800"
      />
    );
  }
  return null;
};
