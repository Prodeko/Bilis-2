import type { PlayerWithStats } from '@common/types'
import PlayerSearch from './PlayerSearch'
import PlayerList from './PlayerList'
import styles from './PlayerSelection.module.scss'
import Queue from './Queue'

type PlayerProps = {
  onChoose: (id: number) => void
  setPlayers: (arg: PlayerWithStats[]) => void
  players: PlayerWithStats[]
  closeSearch: () => void
}

const PlayerSelection = ({ onChoose, setPlayers, closeSearch, players }: PlayerProps) => {
  return (
    <>
      <div className={styles.searchCard}>
        <Queue onChoose={onChoose} players={players} />
      </div>
      <div className={styles.searchCard}>
        <PlayerSearch closeSearch={closeSearch} setPlayers={setPlayers} />
        <PlayerList onChoose={onChoose} players={players} />
      </div>
    </>
  )
}

export default PlayerSelection
