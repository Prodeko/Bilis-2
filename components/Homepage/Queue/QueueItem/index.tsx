import Link from 'next/link'

import { Player } from '@common/types'

import styles from './QueueItem.module.scss'
import { removeFromQueue } from '@state/reducer'
import { StateContext } from '@state/state'
import { useContext } from 'react'

interface QueueItemProps {
  place: number
  player: Player
}

const QueueItem = ({ place, player }: QueueItemProps) => {
  const [, dispatch] = useContext(StateContext)
  const { id, firstName, lastName, emoji } = player

  const removePlayer = () => {
    dispatch(removeFromQueue(id))
  }

  return (
    <div className={styles.container}>
      <div>{place}.</div>
      <Link href={`/player/${id}`}>{`${emoji} ${firstName} ${lastName}`}</Link>
      <button onClick={removePlayer} className={styles.removeBtn} type="button">
        remove
      </button>
    </div>
  )
}

export default QueueItem
