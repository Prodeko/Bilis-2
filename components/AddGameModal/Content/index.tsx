import type { PlayerWithStats } from '@common/types'
import PlayerSelection from './PlayerSelection'
import GameCreation from './GameCreation'
import Title from './Title'
import styles from './Content.module.scss'
import useModalState from './useModalState'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import axios from 'axios'
import { useStateValue, removeFromQueue } from '@state/Queue'

type Props = {
  recentPlayers: PlayerWithStats[]
  onClose: () => void
}

const Content = ({ recentPlayers, onClose }: Props) => {
  const { playerSearchLists, game, setGameField, resetPlayers, setPlayers } =
    useModalState(recentPlayers)
  const [, dispatch] = useStateValue()
  const isActive = Boolean(game.winnerId && game.loserId)

  // TODO validate that all fields are present
  const onSubmit = async () => {
    if (game.winnerId == game.loserId) {
      console.warn('Winner and loser cannot be same')
      // TODO show error msg
      return
    }

    const res = await axios.post(`${NEXT_PUBLIC_API_URL}/game`, game)
    dispatch(removeFromQueue(game.winnerId ?? 0))
    dispatch(removeFromQueue(game.loserId ?? 0))
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
          playerSearchList={playerSearchLists.winner}
          setGameField={setGameField('winnerId')}
          setPlayers={setPlayers('winner')}
          resetPlayers={resetPlayers('winner')}
        />
        <GameCreation
          isActive={isActive}
          onSubmit={onSubmit}
          setGameField={setGameField('underTable')}
        />
        <PlayerSelection
          playerId={game.loserId}
          playerSearchList={playerSearchLists.loser}
          setGameField={setGameField('loserId')}
          setPlayers={setPlayers('loser')}
          resetPlayers={resetPlayers('loser')}
        />
      </div>
    </div>
  )
}

export default Content
