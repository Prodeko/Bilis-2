import type { PlayerWithStats } from '@common/types'
import styles from './AddGame.module.scss'
import PlayerLabel from './PlayerLabel'
import Card from './Card'
import CloseButton from './CloseButton'

type PlayerProps = {
  players: PlayerWithStats[]
  onClose: () => void
}

const AddGame = ({ players, onClose }: PlayerProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <CloseButton onClose={onClose} />
        <PlayerLabel type="winner" />
        <Card players={players} onClose={onClose} />
        <PlayerLabel type="loser" />
      </div>
    </div>
  )
}

export default AddGame
