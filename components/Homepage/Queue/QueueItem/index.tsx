import Link from 'next/link'
import { FiTrash2 } from 'react-icons/fi'

import { Player } from '@common/types'
import { removeFromQueue, useQueueState } from '@state/Queue'

import styles from './QueueItem.module.scss'

interface QueueItemProps {
  place: number
  player: Player
}

const QueueItem = ({ place, player }: QueueItemProps) => {
  const [, dispatch] = useQueueState()
  const { id, firstName, lastName, emoji } = player

  const removePlayer = () => {
    dispatch(removeFromQueue(id))
  }

  return (
    <li className={styles.container}>
      <div className={styles.place}>{place}.</div>
      <Link href={`/player/${id}`}>
        <a className={styles.link}>{`${emoji} ${firstName} ${lastName}`}</a>
      </Link>
      <button onClick={removePlayer} className={styles.removeBtn} type="button">
        <FiTrash2 size={24} />
      </button>
    </li>
  )
}

export default QueueItem
