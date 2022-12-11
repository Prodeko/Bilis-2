import type { PlayerWithStats, RecentGame } from '@common/types'
import PlayerSelection from './PlayerSelection'
import GameCreation from './GameCreation'
import Title from './Title'
import styles from './Content.module.scss'
import useModalState, { ModalContext } from './ModalContextProvider'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import axios from 'axios'
import { useStateValue, removeFromQueue } from '@state/Queue'
import { Dispatch, SetStateAction, useContext } from 'react'

type Props = {
  recentPlayers: PlayerWithStats[]
  onClose: () => void
  setGames: Dispatch<SetStateAction<RecentGame[]>>
}

const Content = ({ recentPlayers, onClose, setGames }: Props) => {
  const { game } = useContext(ModalContext)
  const [, dispatch] = useStateValue()

  // TODO validate that all fields are present
  const onSubmit = async () => {
    if (game.winnerId == game.loserId) {
      console.warn('Winner and loser cannot be same')
      // TODO show error msg
      return
    }

    const res = await axios.post(`/api/game`, game)
    dispatch(removeFromQueue(game.winnerId ?? 0))
    dispatch(removeFromQueue(game.loserId ?? 0))
    setGames(prev => [res.data, ...prev])
    console.log(res.data)
    onClose()
    // TODO show success msg
  }

  return (
    <div className={styles.cardWrapper}>
      <Title title="New Game" />
      <div className={styles.card}>
        <PlayerSelection playerId={game.winnerId} otherPlayerId={game.loserId} side={'winner'} />
        <GameCreation onSubmit={onSubmit} />
        <PlayerSelection playerId={game.loserId} otherPlayerId={game.winnerId} side={'loser'} />
      </div>
    </div>
  )
}

export default Content
