import { setFocus, setPlayerId, useModalState } from '@state/Modal'
import { useQueueState } from '@state/Queue'

import styles from './ChoosePlayer.module.scss'
import PlayerList from './PlayerList'
import PlayerSearch from './PlayerSearch'
import QueuePlayers from './QueuePlayers'
import QueueTitle from './QueueTitle'

type PlayerProps = {
  filterId: number | undefined
  side: 'winner' | 'loser'
}

const ChoosePlayer = ({ filterId, side }: PlayerProps) => {
  const [{ playerSearchLists, selectedIdx }, dispatch] = useModalState()
  const [state] = useQueueState()

  const queuePlayers = state.queue.filter(p => p.id !== filterId)
  const playerSearchList = playerSearchLists[side].filter(p => p.id !== filterId)
  const selectedPlayer =
    queuePlayers?.[queuePlayers.length + selectedIdx] ||
    playerSearchList?.[selectedIdx] ||
    undefined

  const onChoose = () => {
    dispatch(setFocus(side === 'winner' ? 'loser' : 'winner'))
    dispatch(setPlayerId(side, selectedPlayer?.id))
  }

  return (
    <>
      <div className={styles.searchCard}>
        <QueueTitle />
        <QueuePlayers onChoose={onChoose} side={side} players={queuePlayers} />
      </div>
      <div className={styles.searchCard}>
        <PlayerSearch side={side} onChoose={onChoose} />
        <PlayerList onChoose={onChoose} side={side} playerSearchList={playerSearchList} />
      </div>
    </>
  )
}

export default ChoosePlayer
