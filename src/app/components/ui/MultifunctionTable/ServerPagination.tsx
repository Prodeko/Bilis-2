"use client";

import { useState } from "react";
import React from "react";

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
  columnFilters: ColumnFiltersState;
}

export const TableWithServerPagination = <Schema extends object>({
  initialData,
  columns,
  useFetchData,
}: {
  initialData: Schema[];
  columns: ColumnDef<Schema>[];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  useFetchData: (
    x: any,
  ) => UseQueryResult<{ data: Schema[]; pageCount: number }, Error>;
}) => {
  const [data, setData] = useState(initialData);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
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
    pageCount: 20000,
  });

  const currentPaginationState = table.getState().pagination.pageIndex;
  const [displayState, setDisplayState] = useState<number | string>(
    currentPaginationState + 1,
  );

  const { data: fetchedData } = useFetchData({
    limit: 10,
    page: table.getState().pagination.pageIndex + 1,
    sortBy: table.getState().sorting[0]?.id,
    sortDirection: table.getState().sorting[0]?.desc,
    columnFilters,
  });

  React.useEffect(() => {
    if (fetchedData) {
      setData(fetchedData.data);
      console.log("Setting page count", fetchedData.pageCount);
      table.setPageCount(fetchedData.pageCount);
    }
  }, [fetchedData, table]);

  console.log("Page count", table.getPageCount());
  console.log("Page index", table.getState().pagination.pageIndex);
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
