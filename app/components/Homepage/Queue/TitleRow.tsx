import { useMemo } from 'react'
import Select, { SingleValue } from 'react-select'

import type { Player } from '@common/types'
import usePlayers from 'hooks/usePlayers'

import styles from './Queue.module.scss'

interface OptionType {
  label: string
  value: Player
}

interface Props {
  queue: Player[]
  setQueue: any
}

const TitleRow = ({ queue, setQueue }: Props) => {
  const { players } = usePlayers(0)

  const options: OptionType[] = useMemo(
    () =>
      players
        .filter(o => !queue.some(qP => qP.id === o.id))
        .map(p => ({ label: `#${p.id} ${p.firstName} ${p.lastName}`, value: p })),
    [players, queue]
  )

  const handleChange = (newValue: SingleValue<OptionType>) => {
    if (newValue?.value) {
      setQueue([...queue, newValue.value])
    } else {
      // eslint-disable-next-line no-console
      console.warn('Trying to add to queue: ', newValue?.value)
    }
  }
  return (
    <div className={styles.titlerow}>
      <h2 className={styles.title}>Queue</h2>
      <Select
        className={styles.playerSelect}
        options={options}
        onChange={handleChange}
        placeholder="add player to queue"
      />
    </div>
  )
}

export default TitleRow
