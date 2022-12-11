import type { PlayerWithStats } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import styles from './SelectedPlayer.module.scss'
import EloMeter from './EloMeter'
import TableBody from './TableBody'
import TableHead from './TableHead'
import { ModalContext } from '../../ModalContextProvider'

type Props = {
  playerId: number
  side: 'winner' | 'loser'
}

const SelectedPlayer = ({ playerId, side }: Props) => {
  const [player, setPlayer] = useState<PlayerWithStats | undefined>(undefined)
  const { setGameField } = useContext(ModalContext)

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
      <TableHead player={player} onClear={() => setGameField(`${side}Id`)(undefined)} />
      <EloMeter player={player} />
      <TableBody player={player} />
    </table>
  )
}

export default SelectedPlayer
