import { ComponentProps, useState } from 'react'

import { Column } from '@tanstack/react-table'

import styles from './MultifunctionTable.module.scss'

type DivProps = ComponentProps<'div'>

interface Props extends DivProps {
  column: Column<any, any>
}

const options = ['All', '💩', 'No - 💩']
type Options = typeof options[number]

export const SelectFilter = ({ column, ...props }: Props) => {
  const [state, setState] = useState<string>('All')
  const [visible, setVisible] = useState<boolean>(false)

  const switchFilter = (value: Options) => {
    if (value === 'All') {
      column.setFilterValue('')
    } else if (value === '💩') {
      column.setFilterValue('💩')
    } else if (value === 'No - 💩') {
      column.setFilterValue(' ')
    }
  }

  return (
    <div {...props} className={styles.dropdownInputContainer}>
      <input
        placeholder={state}
        className={styles.dropdownInput}
        onClick={() => setVisible(true)}
        // This delay prevents blocking of onMouseDown
        onBlur={() => {
          setTimeout(() => setVisible(false), 1)
        }}
      />
      {visible && (
        <ul className={styles.optionList}>
          {options.map(option => (
            <li
              className={styles.option}
              key={option}
              onMouseDown={() => {
                setState(option)
                switchFilter(option)
                setVisible(false)
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
