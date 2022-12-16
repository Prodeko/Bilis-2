import type { PlayerWithStats } from '@common/types'
import { Side } from '@state/Modal'

import EloMeter from './EloMeter'
import styles from './SelectedPlayer.module.scss'
import TableBody from './TableBody'
import TableHead from './TableHead'

type Props = {
  player: PlayerWithStats
  side: Side
}

const SelectedPlayer = ({ player, side }: Props) => {
  return (
    <div className={styles.layout}>
      <table className={styles.chosenPlayer}>
        <TableHead player={player} side={side} />
        <EloMeter player={player} />
        <TableBody player={player} />
      </table>
    </div>
  )
}

export default SelectedPlayer
