import type { PlayerWithStats } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import axios from 'axios'
import styles from './Card.module.scss'
import GameCreation from './GameCreation'
import PlayerSelection from './PlayerSelection'
import Title from './Title'
import useModalState from './useModalState'

type PlayerProps = {
  players: PlayerWithStats[]
  onClose: () => void
}

const Card = ({ players, onClose }: PlayerProps) => {
  const { playerLists, game, setGameField, resetPlayers, setPlayers } = useModalState(players)

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
        <GameCreation onSubmit={onSubmit} setGameField={setGameField('underTable')} />
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

export default Card
