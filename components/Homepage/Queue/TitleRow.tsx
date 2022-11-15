import { Dispatch, SetStateAction, useContext } from 'react'

import type { Player } from '@common/types'
import PlayerSearchQueue from '@components/utility/PlayerSearch/PlayerSearchQueue'

import styles from './Queue.module.scss'
import { StateContext } from '@state/state'
import { addToQueue } from '@state/reducer'

const TitleRow = () => {
  const [{ queue }, dispatch] = useContext(StateContext)

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
