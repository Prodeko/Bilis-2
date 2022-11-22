import type { Player } from '@common/types'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { round } from 'lodash'
import styles from './ChoosePlayer.module.scss'

type ListProps = {
  playerSearchList: Player[]
  onChoose: (id: number) => void
}

const PlayerList = ({ playerSearchList, onChoose }: ListProps) => {
  const [parent] = useAutoAnimate<HTMLUListElement>({ duration: 200 })
  const hasPlayers = playerSearchList.length > 0

  return (
    <ul ref={parent} className={styles.playerList}>
      {hasPlayers ? (
        playerSearchList.map(p => (
          <li
            className={styles.playerRow}
            key={p.id}
            onClick={() => onChoose(p.id)}
            onKeyDown={() => onChoose(p.id)}
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
