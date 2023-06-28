'use client'

import {
  ColumnDef,
  Table as ReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import styles from './MultifunctionTable.module.scss'
import { Pagination } from './Pagination'
import { Table } from './Table'

const DisplayPageAmount = <Schema extends object>({ table }: Props<Schema>) => {
  return (
    <div>
      {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      <select
        value={table.getState().pagination.pageSize}
        onChange={e => {
          table.setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  )
}

export const TableWithPagination = <Schema extends object>({
  data,
  columns,
}: {
  data: Schema[]
  columns: ColumnDef<Schema>[]
}) => {
  const table = useReactTable({
    data,
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    debugTable: true,
  })

  return (
    <div className={styles.layout}>
      <Table table={table} />
      <Pagination table={table} />
    </div>
  )
}
