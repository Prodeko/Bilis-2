import type { Player } from '@common/types'
import Card from '@components/utility/Card'
import useLocalStorage from 'hooks/useLocalStorage'

import styles from './Queue.module.scss'
import QueueItem from './QueueItem'
import TitleRow from './TitleRow'

const Queue = () => {
  const [queue, setQueue] = useLocalStorage<Player[]>('prodeko-biliskilke-queue', [])

  return (
    <Card rowspan="1 / 2" colspan="2 / 3">
      <TitleRow queue={queue} setQueue={setQueue} />
      <div className={styles.list}>
        {queue.map((player, i) => (
          <QueueItem
            player={player}
            place={i + 1}
            queue={queue}
            setQueue={setQueue}
            key={player.id}
          />
        ))}
      </div>
    </Card>
  )
}

export default Queue
