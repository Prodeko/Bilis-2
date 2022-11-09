import type { PlayerWithStats } from '@common/types'
import PlayerSelection from './PlayerSelection'
import GameCreation from './GameCreation'
import Title from './Title'
import styles from './Content.module.scss'
import useModalState from './useModalState'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import axios from 'axios'

type Props = {
  players: PlayerWithStats[]
  onClose: () => void
}

const Content = ({ players, onClose }: Props) => {
  const { playerLists, game, setGameField, resetPlayers, setPlayers } = useModalState(players)
  const isActive = Boolean(game.winnerId && game.loserId)

  // TODO validate that all fields are present
  const onSubmit = async () => {
    const res = await axios.post(`${NEXT_PUBLIC_API_URL}/game`, game)
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
          players={players}
          playerLists={playerLists}
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
          players={players}
          playerLists={playerLists}
          setGameField={setGameField('loserId')}
          setPlayers={setPlayers('loser')}
          resetPlayers={resetPlayers('loser')}
        />
      </div>
    </div>
  )
}

export default Content
