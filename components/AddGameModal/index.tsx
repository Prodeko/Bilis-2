import type { PlayerWithStats } from '@common/types'
import styles from './AddGameModal.module.scss'
import CloseButton from './CloseButton'
import Content from './Content'
import PlayerLabel from './PlayerLabel'

type PlayerProps = {
  recentPlayers: PlayerWithStats[]
  onClose: () => void
}

const AddGame = ({ recentPlayers, onClose }: PlayerProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <CloseButton onClose={onClose} />
        <PlayerLabel type="winner" />
        <Content recentPlayers={recentPlayers} onClose={onClose} />
        <PlayerLabel type="loser" />
      </div>
    </div>
  )
}

export default AddGame
