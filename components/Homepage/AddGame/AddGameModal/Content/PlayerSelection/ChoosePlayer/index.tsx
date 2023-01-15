import { KeyboardEventHandler } from 'react'

import { SmoothScrollId } from '@common/types'
import { createSmoothScrollFn } from '@common/utils/helperFunctions'
import {
  Side,
  decrementSelectedIdx,
  incrementSelectedIdx,
  setFocus,
  setPlayerId,
  useModalState,
} from '@state/Modal'
import { useQueueState } from '@state/Queue'

import styles from './ChoosePlayer.module.scss'
import PlayerList from './PlayerList'
import PlayerSearch from './PlayerSearch'
import QueuePlayers from './QueuePlayers'
import QueueTitle from './QueueTitle'

type PlayerProps = {
  filterId: number | undefined
  side: Side
}

const ChoosePlayer = ({ filterId, side }: PlayerProps) => {
  const [{ playerSearchLists, selectedIdx }, dispatch] = useModalState()
  const [{ queue }] = useQueueState()
  const smoothScroll = createSmoothScrollFn(SmoothScrollId.Addgame)

  const queuePlayers = queue.filter(p => p.id !== filterId)
  const playerSearchList = playerSearchLists[side].filter(p => p.id !== filterId)
  const selectedPlayer =
    queuePlayers?.[queuePlayers.length + selectedIdx] || playerSearchList?.[selectedIdx]

  const onChoose = () => {
    dispatch(setFocus(side === 'winner' ? 'loser' : 'winner'))
    dispatch(setPlayerId(side, selectedPlayer?.id))
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    switch (e.key) {
      case 'ArrowUp':
        // dont select users over the list
        if (selectedIdx > -queuePlayers.length) {
          dispatch(decrementSelectedIdx())
          smoothScroll()
        }
        break

      case 'ArrowDown':
        // dont select users over the list
        if (selectedIdx < playerSearchList.length - 1) {
          dispatch(incrementSelectedIdx())
          smoothScroll()
        }
        break

      case 'ArrowRight':
        dispatch(setFocus('loser'))
        break

      case 'ArrowLeft':
        dispatch(setFocus('winner'))
        break

      case 'Enter':
        onChoose()
        break
    }
  }

  return (
    <div className={styles.layout}>
      <div className={styles.searchCard}>
        <QueueTitle />
        <QueuePlayers onChoose={onChoose} side={side} players={queuePlayers} />
      </div>
      <div className={styles.searchCard}>
        <PlayerSearch side={side} handleKeyDown={handleKeyDown} />
        <PlayerList onChoose={onChoose} side={side} playerSearchList={playerSearchList} />
      </div>
    </div>
  )
}

export default ChoosePlayer
