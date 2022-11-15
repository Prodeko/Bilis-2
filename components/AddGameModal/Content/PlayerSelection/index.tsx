import type { PlayerWithStats } from '@common/types'
import SelectedPlayer from './SelectedPlayer'
import ChoosePlayer from './ChoosePlayer'
import styles from './PlayerSelection.module.scss'

interface Props {
  playerId: number | undefined
  players: PlayerWithStats[]
  playerLists: {
    winner: PlayerWithStats[]
    loser: PlayerWithStats[]
  }
  setGameField: (val: any) => void
  resetPlayers: () => void
  setPlayers: (players: PlayerWithStats[]) => void
}

const PlayerSelection = ({
  playerId,
  players,
  playerLists,
  setGameField,
  resetPlayers,
  setPlayers,
}: Props) => {
  return (
    <div className={playerId ? styles.cardColumn__selected : styles.cardColumn}>
      {playerId ? (
        <SelectedPlayer playerId={playerId} onClear={() => setGameField(undefined)} />
      ) : (
        <ChoosePlayer
          onChoose={setGameField}
          players={playerLists.winner}
          closeSearch={resetPlayers}
          setPlayers={setPlayers}
        />
      )}
    </div>
  )
}

export default PlayerSelection
