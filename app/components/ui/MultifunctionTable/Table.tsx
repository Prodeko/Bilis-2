import { Table as ReactTable, flexRender } from '@tanstack/react-table'

import { Filter } from './Filter'
import styles from './MultifunctionTable.module.scss'

interface Props<Schema> {
  table: ReactTable<Schema>
}

const dataTypeCellStyling = (cellValue: any) => {
  const dataType = typeof cellValue
  if (dataType === 'number') {
    return styles.numberCell
  } else if (dataType === 'string') {
    return styles.stringCell
  } else if (dataType === 'boolean') {
    return styles.booleanCell
  } else {
    console.warn('Unknown datatype in the header')
  }
}

export const Table = <Schema extends object>({ table }: Props<Schema>) => {
  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        {table.getHeaderGroups().map(headerGroup => (
          <tr className={styles.headerRow} key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              const firstValue = table
                .getPreFilteredRowModel()
                .flatRows[0]?.getValue(header.column.id)
              return (
                <th
                  className={dataTypeCellStyling(firstValue)}
                  key={header.id}
                  colSpan={header.colSpan}
                >
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
