import { Dispatch, SetStateAction } from 'react'

import type { Player } from '@common/types'
import PlayerSearchQueue from '@components/utility/PlayerSearch/PlayerSearchQueue'

import styles from './Queue.module.scss'

interface Props {
  queue: Player[]
  setQueue: Dispatch<SetStateAction<Player[]>>
}

const TitleRow = ({ queue, setQueue }: Props) => {
  const handleSelect = (newValue: Player) => {
    setQueue([...queue, newValue])
  }
  return (
    <div className={styles.titlerow}>
      <h2 className={styles.title}>Queue</h2>
      <span className={styles.search}>
        <PlayerSearchQueue
          placeholder="Add player to queue"
          handleSelect={handleSelect}
          filterFunction={player => !queue.some(queuePlayer => queuePlayer.id === player.id)}
        />
      </span>
    </div>
  )
}

export default TitleRow
