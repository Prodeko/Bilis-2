import type { PlayerWithStats } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import { setFocus, setPlayerId, useModalState } from '@state/Modal'
import axios from 'axios'
import { useEffect, useState } from 'react'
import EloMeter from './EloMeter'
import styles from './SelectedPlayer.module.scss'
import TableBody from './TableBody'
import TableHead from './TableHead'

type Props = {
  playerId: number
  side: 'winner' | 'loser'
}

const SelectedPlayer = ({ playerId, side }: Props) => {
  const [player, setPlayer] = useState<PlayerWithStats | undefined>(undefined)
  const [_, dispatch] = useModalState()

  useEffect(() => {
    axios.get(`/api/player/${playerId}`).then(res => {
      if (typeof res.data == 'object') setPlayer(res.data as PlayerWithStats)
    })
  }, [])

  const onClear = () => {
    dispatch(setPlayerId(side, undefined))
    dispatch(setFocus(side))
  }

  if (!player) return null

  return (
    <table className={styles.chosenPlayer}>
      <TableHead player={player} onClear={onClear} />
      <EloMeter player={player} />
      <TableBody player={player} />
    </table>
  )
}

export default SelectedPlayer
