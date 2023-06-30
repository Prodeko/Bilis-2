import { Dispatch, SetStateAction } from 'react'

import { Column, Table as ReactTable } from '@tanstack/react-table'

import styles from './MultifunctionTable.module.scss'
import { SelectFilter } from './SelectFilter'

interface Props {
  column: Column<any, any>
  table: ReactTable<any>
  setDisplayState: Dispatch<SetStateAction<number | string>>
}

export const Filter = ({ column, table, setDisplayState }: Props) => {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  if (typeof firstValue === 'number') {
    return (
      <div className={styles.filterContainer}>
        <input
          type="number"
          inputMode="numeric"
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={e => {
            column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])
            setDisplayState(1)
          }}
          placeholder={`Min`}
          className={styles.numberInput}
        />
        <input
          type="number"
          inputMode="numeric"
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={e => {
            column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])
            setDisplayState(1)
          }}
          placeholder={`Max`}
          className={styles.numberInput}
        />
      </div>
    )
  } else if (typeof firstValue === 'string' && ['💩', ' '].includes(firstValue)) {
    return <SelectFilter column={column} setDisplayState={setDisplayState} />
  } else if (typeof firstValue === 'string') {
    return (
      <input
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={e => {
          column.setFilterValue(e.target.value)
          setDisplayState(1)
        }}
        placeholder={`Search...`}
        className={styles.textInput}
      />
    )
  }
}
