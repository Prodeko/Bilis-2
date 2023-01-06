import { round } from 'lodash'

import type { Player } from '@common/types'
import { ADD_GAME_LIST_ID } from '@common/utils/constants'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Side, setFocus, setSelectedIdx, useModalState } from '@state/Modal'

import styles from './ChoosePlayer.module.scss'

type ListProps = {
  playerSearchList: Player[]
  onChoose: (id: number) => void
  side: Side
}

const PlayerList = ({ playerSearchList, onChoose, side }: ListProps) => {
  const [parent] = useAutoAnimate<HTMLUListElement>({ duration: 200 })
  const hasPlayers = playerSearchList.length > 0
  const [{ selectedIdx, focus }, dispatch] = useModalState()

  const isSelected = (i: number) => i == selectedIdx && focus === side
  const onHover = (i: number) => {
    return () => {
      dispatch(setFocus(side))
      dispatch(setSelectedIdx(i))
    }
  }

  return (
    <ul ref={parent} className={styles.playerList}>
      {hasPlayers ? (
        playerSearchList.map((p, i) => (
          <li
            id={isSelected(i) ? ADD_GAME_LIST_ID : ''}
            className={isSelected(i) ? styles.playerRow__selected : styles.playerRow}
            key={p.id}
            onClick={() => onChoose(p.id)}
            onMouseMoveCapture={onHover(i)}
            tabIndex={0}
            role="button"
          >
            <span>
              {p.emoji} {p.firstName} {p.lastName}
            </span>
            <span>{round(p.elo)}</span>
          </li>
        ))
      ) : (
        <li className={styles.noplayers}>No players found</li>
      )}
    </ul>
  )
}

export default PlayerList
