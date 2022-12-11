import type { PlayerWithStats } from '@common/types'
import SelectedPlayer from './SelectedPlayer'
import ChoosePlayer from './ChoosePlayer'
import styles from './PlayerSelection.module.scss'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  playerId: number | undefined
  otherPlayerId: number | undefined
  playerSearchList: PlayerWithStats[]
  setGameField: (val: any) => void
  resetPlayers: () => void
  setPlayers: (players: PlayerWithStats[]) => void
  selectedIdx: number
  setSelectedIdx: Dispatch<SetStateAction<number>>
}

const PlayerSelection = ({
  playerId,
  otherPlayerId,
  playerSearchList,
  setGameField,
  resetPlayers,
  setPlayers,
  selectedIdx,
  setSelectedIdx,
}: Props) => {
  const [parent, _enableAnimations] = useAutoAnimate<HTMLDivElement>({ duration: 500 })

  return (
    <div ref={parent} className={playerId ? styles.cardColumn__selected : styles.cardColumn}>
      {playerId ? (
        <SelectedPlayer playerId={playerId} onClear={() => setGameField(undefined)} />
      ) : (
        <ChoosePlayer
          onChoose={setGameField}
          filterId={otherPlayerId}
          playerSearchList={playerSearchList}
          closeSearch={resetPlayers}
          setPlayers={setPlayers}
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
        />
      )}
    </div>
  )
}

export default PlayerSelection
