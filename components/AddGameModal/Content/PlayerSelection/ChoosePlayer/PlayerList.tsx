import type { Player } from '@common/types'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useModalState } from '@state/Modal'
import { round } from 'lodash'
import styles from './ChoosePlayer.module.scss'

type ListProps = {
  playerSearchList: Player[]
  onChoose: (id: number) => void
  side: string
}

const PlayerList = ({ playerSearchList, onChoose, side }: ListProps) => {
  const [parent] = useAutoAnimate<HTMLUListElement>({ duration: 200 })
  const hasPlayers = playerSearchList.length > 0
  const [{ selectedIdx, focus }] = useModalState()

  const isSelected = (i: number) => i == selectedIdx && focus === side

  return (
    <ul ref={parent} className={styles.playerList}>
      {hasPlayers ? (
        playerSearchList.map((p, i) => (
          <li
            id={isSelected(i) ? `add-game-list` : ''}
            className={isSelected(i) ? styles.playerRow__selected : styles.playerRow}
            key={p.id}
            onClick={() => onChoose(p.id)}
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
