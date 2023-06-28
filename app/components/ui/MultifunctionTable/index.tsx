'use client'

import React, { ComponentProps } from 'react'
import { IconType } from 'react-icons'
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'

import {
  Column,
  ColumnDef,
  OnChangeFn,
  PaginationState,
  Table as ReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Filter } from './Filter'
import styles from './MultifunctionTable.module.scss'

export interface PlayerTableSchema {
  position: number
  fullName: string
  fargo: number
  gameCount: number
  winCount: number
  winPercentage: string
}

export interface GameTableSchema {
  time: string
  winner: string
  winnerFargoNow: number
  winnerFargoDifference: number
  winner: string
  loserFargoNow: number
  loserFargoDifference: number
  underTable: boolean
}

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

type ButtonProps = ComponentProps<'button'>
type InputProps = ComponentProps<'input'>

interface PaginationButtonProps extends ButtonProps {
  Icon: IconType
}

const PaginationButton = ({ Icon, ...props }: PaginationButtonProps) => {
  return (
    <button {...props} className={styles.paginationButton}>
      <Icon size={24} />
    </button>
  )
}

type PaginationInputProps = InputProps

const PaginationInput = ({ ...props }: PaginationInputProps) => {
  return <input {...props} type="number" className={styles.paginationInput} />
}

const Pagination = <Schema extends object>({ table }: Props<Schema>) => {
  return (
    <div className={styles.paginationContainer}>
      <PaginationButton
        Icon={FiChevronsLeft}
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      />
      <PaginationButton
        Icon={FiChevronLeft}
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      />
      <PaginationInput
        onChange={e => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0
          table.setPageIndex(page)
        }}
        onBlur={e => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0
          table.setPageIndex(page)
        }}
        defaultValue={table.getState().pagination.pageIndex + 1}
      />
      <PaginationButton
        Icon={FiChevronRight}
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      />
      <PaginationButton
        Icon={FiChevronsRight}
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      />
    </div>
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

export const getGameColumnSchema = () => {
  const columnHelper = createColumnHelper<GameTableSchema>()
  return [
    columnHelper.accessor('time', {
      header: 'time',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('winner', {
      header: 'winner',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('winnerFargoNow', {
      header: 'w.fargo',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('loser', {
      header: 'loser',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('loserFargoNow', {
      header: 'l.fargo',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('underTable', {
      header: 'ut',
      cell: info => info.getValue(),
    }),
  ]
}

export const getPlayerColumnSchema = () => {
  const columnHelper = createColumnHelper<PlayerTableSchema>()
  return [
    columnHelper.accessor('position', {
      header: 'pos',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('fullName', {
      header: 'name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('fargo', {
      header: 'fargo',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('gameCount', {
      header: 'games',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('winCount', {
      header: 'wins',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('winPercentage', {
      header: 'win %',
      cell: info => info.getValue(),
    }),
  ]
}
