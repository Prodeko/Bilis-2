import type { PlayerWithStats } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import styles from './Card.module.scss'
import axios from 'axios'
import SelectedPlayer from './SelectedPlayer'
import PlayerSelection from './PlayerSelection'
import Title from './Title'
import UnderTableInput from './UnderTableInput'
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
        <div className={game.winnerId ? styles.cardColumn__selected : styles.cardColumn}>
          {game.winnerId ? (
            <SelectedPlayer
              player={players.find(p => p.id === game.winnerId) as PlayerWithStats}
              onClear={() => setGameField('winnerId')(undefined)}
            />
          ) : (
            <PlayerSelection
              onChoose={setGameField('winnerId')}
              players={playerLists.winner}
              closeSearch={resetPlayers('winner')}
              setPlayers={setPlayers('winner')}
            />
          )}
        </div>
        <div className={styles.buttonWrapper}>
          <button onClick={onSubmit} type="button">
            Add Game
          </button>
          <UnderTableInput onChange={checked => setGameField('underTable')(checked)} />
        </div>
        <div className={game.loserId ? styles.cardColumn__selected : styles.cardColumn}>
          {game.loserId ? (
            <SelectedPlayer
              player={players.find(p => p.id === game.loserId) as PlayerWithStats}
              onClear={() => setGameField('loserId')(undefined)}
            />
          ) : (
            <PlayerSelection
              onChoose={setGameField('loserId')}
              players={playerLists.loser}
              closeSearch={resetPlayers('loser')}
              setPlayers={setPlayers('loser')}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
