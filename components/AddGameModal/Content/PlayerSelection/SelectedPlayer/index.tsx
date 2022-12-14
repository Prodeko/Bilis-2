
import type { PlayerWithStats } from '@common/types'
import { setFocus, setPlayerId, Side, useModalState } from '@state/Modal'
import axios from 'axios'
import { useState, useEffect } from 'react'
import EloMeter from './EloMeter'
import styles from './SelectedPlayer.module.scss'
import TableBody from './TableBody'
import TableHead from './TableHead'

type Props = {
  playerId: number
  side: Side
}

const SelectedPlayer = ({ playerId, side }: Props) => {
  const [_, dispatch] = useModalState()

  const [player, setPlayer] = useState<PlayerWithStats | null>(null)

  useEffect(() => {
      axios.get(`/api/player/${playerId}`).then(res => {
        setPlayer(res.data as PlayerWithStats)
      })
  }, [playerId])

  const onClear = async () => {
    await dispatch(setPlayerId(side, undefined))
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
