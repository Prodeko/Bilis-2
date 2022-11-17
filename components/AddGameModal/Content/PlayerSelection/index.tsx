import type { PlayerWithStats } from '@common/types'
import SelectedPlayer from './SelectedPlayer'
import ChoosePlayer from './ChoosePlayer'
import styles from './PlayerSelection.module.scss'

interface Props {
  playerId: number | undefined
  playerSearchList: PlayerWithStats[]
  setGameField: (val: any) => void
  resetPlayers: () => void
  setPlayers: (players: PlayerWithStats[]) => void
}

const PlayerSelection = ({
  playerId,
  playerSearchList,
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
          playerSearchList={playerSearchList}
          closeSearch={resetPlayers}
          setPlayers={setPlayers}
        />
      )}
    </div>
  )
}

export default PlayerSelection
