import type { Player } from '@common/types'
import PlayerSearchQueue from '@components/utility/PlayerSearch/PlayerSearchQueue'

import { addToQueue, useStateValue } from '@state/Queue'
import styles from './Queue.module.scss'

const TitleRow = () => {
  const [{ queue }, dispatch] = useStateValue()

  const handleSelect = (player: Player) => {
    dispatch(addToQueue(player))
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
