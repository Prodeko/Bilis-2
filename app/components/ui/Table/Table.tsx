import { cva } from "class-variance-authority";
import type { KeyboardEvent, MouseEvent } from "react";

import type { WithId } from "@common/types";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const defineColumnSpan = (startingIndices: number[], currIdx: number) => {
  return {
    gridColumnStart: startingIndices[currIdx],
    gridColumnEnd:
      currIdx < startingIndices.length - 1 ? startingIndices[currIdx + 1] : -1,
  };
};

interface Props<T extends WithId> {
  dataRows: T[];
  columns: ColumnDef<T, number>[];
  columnStartIndices: number[];
  rowOnClick?: (
    id: number,
  ) => (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
  disableRowHoverEffects?: boolean;
}

const headerStyles = cva(
  "grid w-full grid-cols-12 items-center justify-items-start gap-x-3 border-b-[3px] border-b-primary-600 px-6 py-2 text-lg font-semibold uppercase text-primary-300",
);

const rowStyles = cva(
  "grid w-full grid-cols-12 items-center justify-items-start gap-x-3 px-6 py-2 text-base font-medium text-primary-50",
  {
    variants: {
      hoverable: {
        true: "cursor-pointer transition-all duration-100 hover:bg-primary-700",
      },
    },
  },
);

export const Table = ({
  dataRows,
  columns,
  columnStartIndices,
  rowOnClick,
  disableRowHoverEffects,
}: Props<WithId>) => {
  // const [data, setData] = useState<T[]>(dataRows)
  const [parent] = useAutoAnimate<HTMLTableSectionElement>({ duration: 250 });
  const table = useReactTable({
    data: dataRows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="grid h-full grid-rows-[auto_minmax(0,_1fr)]">
      <thead className="h-full">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className={headerStyles()}>
            {headerGroup.headers.map((header, idx) => (
              <th
                className="w-full truncate text-start"
                key={header.id}
                style={defineColumnSpan(columnStartIndices, idx)}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody
        ref={parent}
        className="flex h-full flex-col divide-y-[2px] divide-neutral-700 divide-opacity-40 overflow-y-scroll shadow-inner shadow-neutral-800"
      >
        {table.getRowModel().rows.map((row) => (
          <tr
            onClick={rowOnClick?.(row.original.id)}
            onKeyUp={rowOnClick?.(row.original.id)}
            key={row.id}
            className={rowStyles({ hoverable: !disableRowHoverEffects })}
          >
            {row.getVisibleCells().map((cell, idx) => (
              <td
                key={cell.id}
                className="flex min-h-full w-full items-center truncate text-start"
                style={defineColumnSpan(columnStartIndices, idx)}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
