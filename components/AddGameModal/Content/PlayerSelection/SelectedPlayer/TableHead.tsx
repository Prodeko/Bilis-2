import styles from './SelectedPlayer.module.scss'
import type { PlayerStats, Player } from '@common/types'
import Image from 'next/image'
import PencilImage from '@public/images/edit-pencil.svg'

type PlayerWithStats = Player & PlayerStats

interface Props {
  player: PlayerWithStats
  onClear: () => void
}

const TableHead = ({ onClear, player }: Props) => {
  return (
    <thead className={styles.head}>
      <tr>
        <th>
          {player.firstName} {player.lastName}
        </th>
        <th>
          <button onClick={onClear} type="button">
            <Image src={PencilImage} width={40} alt="edit pencil" />
          </button>
        </th>
      </tr>
    </thead>
  )
}

export default TableHead
