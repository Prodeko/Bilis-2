import Image from 'next/image'

import type { PlayerWithStats } from '@common/types'
import PencilImage from '@public/images/edit-pencil.svg'

import styles from './SelectedPlayer.module.scss'

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
