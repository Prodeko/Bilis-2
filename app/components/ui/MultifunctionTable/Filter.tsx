import { Table as ReactTable } from '@tanstack/react-table'

import styles from './MultifunctionTable.module.scss'

export const Filter = ({ column, table }: { column: Column<any, any>; table: ReactTable<any> }) => {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  if (typeof firstValue === 'number') {
    return (
      <div className={styles.filterContainer}>
        <input
          type="number"
          inputMode="numeric"
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={e =>
            column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])
          }
          placeholder={`Min`}
          className={styles.numberInput}
        />
        <input
          type="number"
          inputMode="numeric"
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={e =>
            column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])
          }
          placeholder={`Max`}
          className={styles.numberInput}
        />
      </div>
    )
  } else if (typeof firstValue === 'string') {
    return (
      <input
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={e => column.setFilterValue(e.target.value)}
        placeholder={`Search...`}
        className={styles.textInput}
      />
    )
  } else if (typeof firstValue === 'boolean') {
    /**
     * Implement filter where
     * 1. Default: no filter
     * 2. Filter - show UT: show only ut games
     * 3. Filter - show no UT: show only non-ut games
     *
     */
    // return <input type="checkbox" onChange={e => column.setFilterValue(e.target.checked)} />
  }
}
