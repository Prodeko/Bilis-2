import type { Dispatch, SetStateAction } from "react";

import type { Column } from "@tanstack/react-table";

import { SelectFilter } from "./SelectFilter";

type FilterDataType = "string" | "number" | "boolean";

interface Props {
  dataType: FilterDataType;
  column: Column<any, any>;
  setDisplayState: Dispatch<SetStateAction<number | string>>;
}

export const Filter = ({ column, dataType, setDisplayState }: Props) => {
  const columnFilterValue = column.getFilterValue();

  if (dataType === "boolean") {
    return <SelectFilter column={column} setDisplayState={setDisplayState} />;
  }
  if (dataType === "string") {
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
  if (dataType === "number") {
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

  throw new Error("Invalid data type");
};
