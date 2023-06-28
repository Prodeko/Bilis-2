import { Table as ReactTable, flexRender } from '@tanstack/react-table'

import { Filter } from './Filter'
import styles from './MultifunctionTable.module.scss'

interface Props<Schema> {
  table: ReactTable<Schema>
}

export const Table = <Schema extends object>({ table }: Props<Schema>) => {
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
