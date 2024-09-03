"use client";

import { set } from "lodash";
import { useState } from "react";
import React from "react";

import useDebounce from "@hooks/useDebounce";
import type { UseQueryResult } from "@tanstack/react-query";
import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Pagination } from "./Pagination";
import { Table } from "./Table";

export interface PaginatedQueryParams {
  limit: number;
  page: number;
  sortBy: string;
  sortDirection: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  columnFilters: any[];
}

export const TableWithServerPagination = <Schema extends object>({
  initialData,
  initialPageCount,
  columns,
  useFetchData,
}: {
  initialData: Schema[];
  initialPageCount: number;
  columns: ColumnDef<Schema>[];
  useFetchData: (
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    x: any,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ) => UseQueryResult<{ data: any; pageCount: any }, Error>;
}) => {
  const [data, setData] = useState(initialData);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [debouncedFilters, setDebouncedFilters] =
    useDebounce<ColumnFiltersState>([], 500);
  const [pageCount, setPageCount] = useState(1);
  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    manualFiltering: true,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    //
    debugTable: true,
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
    pageCount: initialPageCount,
  });

  const currentPaginationState = table.getState().pagination.pageIndex;
  const [displayState, setDisplayState] = useState<number | string>(
    currentPaginationState + 1,
  );

  const { data: fetchedData } = useFetchData({
    limit: 10,
    page: table.getState().pagination.pageIndex + 1,
    sortBy: table.getState().sorting[0]?.id,
    sortDirection: table.getState().sorting[0]?.desc ? "DESC" : "ASC",
    columnFilters: debouncedFilters,
  });

  React.useEffect(() => {
    setDebouncedFilters(columnFilters);
  }, [columnFilters, setDebouncedFilters]);

  React.useEffect(() => {
    if (fetchedData) {
      setData(fetchedData.data);
      table.setPageCount(fetchedData.pageCount);
    }
  }, [fetchedData, table]);

  return (
    <div className="grid grid-rows-[minmax(0_,1fr)_auto]">
      <Table table={table} setDisplayState={setDisplayState} />
      <Pagination
        table={table}
        displayState={displayState}
        setDisplayState={setDisplayState}
      />
    </div>
  );
};
