import Link from 'next/link'

import { Player } from '@common/types'

import styles from './QueueItem.module.scss'
import { removeFromQueue, useStateValue } from '@state/Queue'

interface QueueItemProps {
  place: number
  player: Player
}

const QueueItem = ({ place, player }: QueueItemProps) => {
  const [, dispatch] = useStateValue()
  const { id, firstName, lastName, emoji } = player

  const removePlayer = () => {
    dispatch(removeFromQueue(id))
  }

  return (
    <li className={styles.container}>
      <div>{place}.</div>
      <Link href={`/player/${id}`}>{`${emoji} ${firstName} ${lastName}`}</Link>
      <button onClick={removePlayer} className={styles.removeBtn} type="button">
        remove
      </button>
    </li>
  )
}

export default QueueItem
