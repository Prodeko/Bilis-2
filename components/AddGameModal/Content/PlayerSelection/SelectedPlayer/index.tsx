import type { PlayerWithStats } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './SelectedPlayer.module.scss'
import EloMeter from './EloMeter'
import TableBody from './TableBody'
import TableHead from './TableHead'

type Props = {
  playerId: number
  onClear: () => void
}

const SelectedPlayer = ({ playerId, onClear }: Props) => {
  const [player, setPlayer] = useState<PlayerWithStats | undefined>(undefined)

  useEffect(() => {
    axios.get(`/api/player/${playerId}`).then(res => {
      if (typeof res.data == 'object') setPlayer(res.data as PlayerWithStats)
    })
  }, [])

  if (!player) {
    return null
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
