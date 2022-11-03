import type { PlayerStats, Player } from '@common/types'
import styles from './SelectedPlayer.module.scss'
import TableHead from './TableHead'
import TableBody from './TableBody'

type PlayerWithStats = Player & PlayerStats
type Props = {
  player: PlayerWithStats
  onClear: () => void
}

const SelectedPlayer = ({ player, onClear }: Props) => {
  return (
    <table className={styles.chosenPlayer}>
      <TableHead player={player} onClear={onClear} />
      <TableBody player={player} />
    </table>
  )
}

export default SelectedPlayer
