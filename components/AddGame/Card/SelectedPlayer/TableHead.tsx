import styles from './SelectedPlayer.module.scss'
import type { PlayerStats, Player } from '@common/types'

type PlayerWithStats = Player & PlayerStats

interface Props {
  player: PlayerWithStats
  onClear: () => void
}

const TableHead = ({ onClear, player }: Props) => {
  return (
    <thead className={styles.title}>
      <th>
        <td>
          {player.firstName} {player.lastName}
        </td>
        <td>
          <button onClick={onClear} type="button">
            <img src="/images/edit-pencil.svg" alt="edit pencil" />
          </button>
        </td>
      </th>
    </thead>
  )
}

export default TableHead
