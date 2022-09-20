import useLocalStorage from 'hooks/useLocalStorage'
import { FunctionComponent, useMemo } from 'react'
import { Player } from '@common/types'
import usePlayers from 'hooks/usePlayers'
import Select, { SingleValue } from 'react-select'
import styles from './Queue.module.scss'
import QueueItem from './QueueItem'

interface OptionType {
  label: string
  value: Player
}

const Queue: FunctionComponent = () => {
  const { players } = usePlayers()
  const [queue, setQueue] = useLocalStorage<Player[]>('prodeko-biliskilke-queue', [])

  const options: OptionType[] = useMemo(
    () => players.map(p => ({ label: `#${p.id} ${p.firstName} ${p.lastName}`, value: p })),
    [players]
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
    <div className={styles.container}>
      <h2 className={styles.title}>Queue</h2>
      <Select
        className={styles.addBtn}
        options={options}
        onChange={handleChange}
        placeholder="add player to queue"
      />
      <div className={styles.list}>
        {queue.map((player, i) => (
          <QueueItem player={player} place={i + 1} key={player.id} />
        ))}
      </div>
    </div>
  )
}

export default Queue
