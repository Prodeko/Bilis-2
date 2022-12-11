import type { PlayerWithStats, RecentGame } from '@common/types'
import PlayerSelection from './PlayerSelection'
import GameCreation from './GameCreation'
import Title from './Title'
import styles from './Content.module.scss'
import useModalState from './useModalState'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import axios from 'axios'
import { useStateValue, removeFromQueue } from '@state/Queue'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  recentPlayers: PlayerWithStats[]
  onClose: () => void
  setGames: Dispatch<SetStateAction<RecentGame[]>>
}

const Content = ({ recentPlayers, onClose, setGames }: Props) => {
  const {
    playerSearchLists,
    game,
    setGameField,
    resetPlayers,
    setPlayers,
    selectedIdx,
    setSelectedIdx,
  } = useModalState(recentPlayers)
  const [, dispatch] = useStateValue()
  const isActive = Boolean(game.winnerId && game.loserId)

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
        <PlayerSelection
          playerId={game.winnerId}
          otherPlayerId={game.loserId}
          playerSearchList={playerSearchLists.winner}
          setGameField={setGameField('winnerId')}
          setPlayers={setPlayers('winner')}
          resetPlayers={resetPlayers('winner')}
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
        />
        <GameCreation
          isActive={isActive}
          onSubmit={onSubmit}
          setGameField={setGameField('underTable')}
        />
        <PlayerSelection
          playerId={game.loserId}
          otherPlayerId={game.winnerId}
          playerSearchList={playerSearchLists.loser}
          setGameField={setGameField('loserId')}
          setPlayers={setPlayers('loser')}
          resetPlayers={resetPlayers('loser')}
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
        />
      </div>
    </div>
  )
}

export default Content
