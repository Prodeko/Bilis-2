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

import { Filter } from './Filter'
import styles from './MultifunctionTable.module.scss'
import { Pagination } from './Pagination'

interface Props<Schema> {
  table: ReactTable<Schema>
}

const Table = <Schema extends object>({ table }: Props<Schema>) => {
  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        {table.getHeaderGroups().map(headerGroup => (
          <tr className={styles.headerRow} key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <th className={styles.headerCell} key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div className={styles.headerContainer}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanFilter() ? (
                        <Filter column={header.column} table={table} />
                      ) : null}
                    </div>
                  )}
                </th>
              )
            })}
          </tr>
        ))}
      </thead>
      <tbody className={styles.tableBody}>
        {table.getRowModel().rows.map(row => {
          return (
            <tr className={styles.dataRow} key={row.id}>
              {row.getVisibleCells().map(cell => {
                return (
                  <td className={styles.dataCell} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

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
