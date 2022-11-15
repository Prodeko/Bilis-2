import type { Player, PlayerStats } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './SelectedPlayer.module.scss'
import TableBody from './TableBody'
import TableHead from './TableHead'

type PlayerWithStats = Player & PlayerStats
type Props = {
  playerId: number
  onClear: () => void
}

const SelectedPlayer = ({ playerId, onClear }: Props) => {
  const [player, setPlayer] = useState<PlayerWithStats | undefined>(undefined)

  useEffect(() => {
    axios.get(`${NEXT_PUBLIC_API_URL}/player/${playerId}`).then(res => {
      if (typeof res.data == 'object') setPlayer(res.data as PlayerWithStats)
    })
  }, [])

  if (!player) {
    return null
  }

  return (
    <table className={styles.chosenPlayer}>
      <TableHead player={player} onClear={onClear} />
      <TableBody player={player} />
    </table>
  )
}

export default SelectedPlayer
