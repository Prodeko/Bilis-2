import { MouseEvent, useState } from 'react'

import { WithId } from '@common/types'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import styles from './Table.module.scss'

type T = WithId

const defineColumnSpan = (startingIndices: number[], currIdx: number) => {
  return {
    gridColumnStart: startingIndices[currIdx],
    gridColumnEnd: currIdx < startingIndices.length - 1 ? startingIndices[currIdx + 1] : -1,
  }
}

interface Props {
  dataRows: T[]
  columns: ColumnDef<T, number>[]
  columnStartIndices: number[]
  rowOnClick?: (id: number) => (e: MouseEvent<HTMLElement>) => void
}

export const Table = ({ dataRows, columns, columnStartIndices, rowOnClick }: Props) => {
  // const [data, setData] = useState<T[]>(dataRows)
  const [parent] = useAutoAnimate<HTMLTableSectionElement>({ duration: 250 })
  const table = useReactTable({
    data: dataRows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className={styles.table}>
      <thead className={styles.head}>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className={styles.header}>
            {headerGroup.headers.map((header, idx) => (
              <th key={header.id} style={defineColumnSpan(columnStartIndices, idx)}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody ref={parent} className={styles.body}>
        {table.getRowModel().rows.map(row => (
          <tr onClick={rowOnClick?.(row.original.id)} key={row.id} className={styles.row}>
            {row.getVisibleCells().map((cell, idx) => (
              <td
                key={cell.id}
                className={styles.cell}
                style={defineColumnSpan(columnStartIndices, idx)}
              >
                {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
                {cell.renderValue()}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {/* <tfoot>
        {table.getFooterGroups().map(footerGroup => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.footer, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </tfoot> */}
    </table>
  )
}
