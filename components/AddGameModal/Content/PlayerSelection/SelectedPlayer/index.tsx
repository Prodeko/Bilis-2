
import type { PlayerWithStats } from '@common/types'
import { setFocus, setPlayerId, Side, useModalState } from '@state/Modal'
import EloMeter from './EloMeter'
import styles from './SelectedPlayer.module.scss'
import TableBody from './TableBody'
import TableHead from './TableHead'

type Props = {
  player: PlayerWithStats
  side: Side
}

const SelectedPlayer = ({ player, side }: Props) => {
  const [_, dispatch] = useModalState()

  const onClear = () => {
    dispatch(setPlayerId(side, undefined))
    dispatch(setFocus(side))
  }
  
  return (
    <table className={styles.chosenPlayer}>
      <TableHead player={player} onClear={onClear} />
      <EloMeter player={player} />
      <TableBody player={player} />
    </table>
  )
}

export default SelectedPlayer
