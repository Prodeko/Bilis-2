import useLocalStorage from 'hooks/useLocalStorage'
import { FunctionComponent } from 'react'
import { Player } from '@common/types'
import styles from './Queue.module.scss'
import QueueItem from './QueueItem'

interface QueueProps {}

const TEST_QUEUE: Player[] = [
  {
    id: 1344345345,
    firstName: 'Petteri',
    lastName: 'Ranta',
    nickname: 'Raikku',
    emoji: 'U+1F480',
    elo: 666,
  },
  {
    id: 435345,
    firstName: 'Petteri',
    lastName: 'Ranta',
    nickname: 'Raikku',
    emoji: 'U+1F480',
    elo: 666,
  },
  {
    id: 65263,
    firstName: 'Petteri',
    lastName: 'Ranta',
    nickname: 'Raikku',
    emoji: 'U+1F480',
    elo: 666,
  },
  {
    id: 2135123,
    firstName: 'Petteri',
    lastName: 'Ranta',
    nickname: 'Raikku',
    emoji: 'U+1F480',
    elo: 666,
  },
]

const Queue: FunctionComponent<QueueProps> = () => {
  const [queue, setQueue] = useLocalStorage<Player[]>('prodeko-biliskilke-queue', TEST_QUEUE)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Queue</h2>
      <button className={styles.addBtn} type="button">add player to queue</button>
      <div className={styles.list}>
        {queue.map((player, i) => (
          <QueueItem player={player} place={i + 1} key={player.id} />
        ))}
      </div>
    </div>
  )
}

export default Queue
