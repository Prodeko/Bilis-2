import { Player } from '@common/types'
import styles from './QueueItem.module.scss'

interface QueueItemProps {
  place: number
  player: Player
  queue: Player[]
  setQueue: (p: Player[]) => void
}

const QueueItem = ({ place, player, setQueue, queue }: QueueItemProps) => {
  const removePlayer = () => {
    setQueue(queue.filter(q => q.id !== player.id))
  }

  return (
    <div className={styles.container}>
      <div>{place}.</div>
      <div>{`${player.emoji} ${player.firstName} ${player.lastName}`}</div>
      <button onClick={removePlayer} className={styles.removeBtn} type="button">
        remove
      </button>
    </div>
  )
}

export default QueueItem
