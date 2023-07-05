'use client'

import { useState } from 'react'

import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import styles from './MultifunctionTable.module.scss'
import { Pagination } from './Pagination'
import { Table } from './Table'

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

  const currentPaginationState = table.getState().pagination.pageIndex
  const [displayState, setDisplayState] = useState<number | string>(currentPaginationState + 1)
  return (
    <div className={styles.layout}>
      <Table table={table} setDisplayState={setDisplayState} />
      <Pagination table={table} displayState={displayState} setDisplayState={setDisplayState} />
    </div>
  )
}
