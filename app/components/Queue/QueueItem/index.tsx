import { Player } from '@common/types'
import { FunctionComponent } from 'react'
import styles from './QueueItem.module.scss'

interface QueueItemProps {
  place: number
  player: Player
}

const QueueItem: FunctionComponent<QueueItemProps> = ({ place, player }) => {
  return (
    <div>
      <div>{place}</div>
      <div>{`${player.firstName} ${player.lastName}`}</div>
      <button type="button">remove</button>
    </div>
  )
}

export default QueueItem
