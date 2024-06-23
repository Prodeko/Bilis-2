import { cva } from "class-variance-authority";
import type { Dispatch, SetStateAction } from "react";

import { type Table as ReactTable, flexRender } from "@tanstack/react-table";

import { Filter } from "./Filter";

interface Props<Schema> {
  table: ReactTable<Schema>;
  setDisplayState: Dispatch<SetStateAction<number | string>>;
}

const dataCellStyles = cva("p-3", {
  variants: {
    dataType: {
      string: "w-full",
      number: "w-1/2",
      boolean: "w-1/3",
    },
  },
});

export const Table = <Schema extends object>({
  table,
  setDisplayState,
}: Props<Schema>) => {
  return (
    <table className="w-full table-fixed border-collapse">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            className="divide-2 h-14 divide-neutral-600 divide-opacity-40 bg-neutral-900 text-xl font-semibold uppercase text-neutral-400"
            key={headerGroup.id}
          >
            {headerGroup.headers.map((header) => {
              const firstValue = table
                .getPreFilteredRowModel()
                .flatRows[0]?.getValue(header.column.id);
              return (
                <th
                  className={dataCellStyles({ dataType: typeof firstValue })}
                  key={header.id}
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex flex-col gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {header.column.getCanFilter() ? (
                        <Filter
                          column={header.column}
                          table={table}
                          setDisplayState={setDisplayState}
                        />
                      ) : null}
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody className="h-full overflow-y-auto">
        {table.getRowModel().rows.map((row) => {
          return (
            <tr
              className="divide-x-2 divide-neutral-800 divide-opacity-40 text-xl font-medium text-neutral-50 odd:bg-neutral-600 even:bg-neutral-700"
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <td className={dataCellStyles()} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
