import type { PlayerWithStats } from '@common/types'
import PlayerSearch from './PlayerSearch'
import PlayerList from './PlayerList'
import styles from './ChoosePlayer.module.scss'
import Queue from './Queue'

type PlayerProps = {
  onChoose: (id: number) => void
  setPlayers: (arg: PlayerWithStats[]) => void
  playerSearchList: PlayerWithStats[]
  closeSearch: () => void
}

const ChoosePlayer = ({ onChoose, setPlayers, closeSearch, playerSearchList }: PlayerProps) => {
  return (
    <>
      <div className={styles.searchCard}>
        <Queue onChoose={onChoose} />
      </div>
      <div className={styles.searchCard}>
        <PlayerSearch closeSearch={closeSearch} setPlayers={setPlayers} />
        <PlayerList onChoose={onChoose} playerSearchList={playerSearchList} />
      </div>
    </>
  )
}

export default ChoosePlayer
