import type { Game, PlayerWithStats, RecentGame } from '@common/types'
import { Dispatch, SetStateAction } from 'react'
import styles from './AddGameModal.module.scss'
import CloseButton from './CloseButton'
import Content from './Content'
import PlayerLabel from './PlayerLabel'

type PlayerProps = {
  recentPlayers: PlayerWithStats[]
  onClose: () => void
  setGames: Dispatch<SetStateAction<RecentGame[]>>
}

const AddGame = ({ recentPlayers, onClose, setGames }: PlayerProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <CloseButton onClose={onClose} />
        <PlayerLabel type="winner" />
        <Content setGames={setGames} recentPlayers={recentPlayers} onClose={onClose} />
        <PlayerLabel type="loser" />
      </div>
    </div>
  )
}

export default AddGame
