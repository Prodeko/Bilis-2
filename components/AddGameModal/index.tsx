import type { PlayerWithStats } from '@common/types'
import styles from './AddGameModal.module.scss'
import CloseButton from './CloseButton'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import axios from 'axios'
import GameCreation from './GameCreation'
import PlayerLabel from './PlayerLabel'
import PlayerSelection from './PlayerSelection'
import Title from './Title'
import useModalState from './useModalState'

type PlayerProps = {
  players: PlayerWithStats[]
  onClose: () => void
}

const AddGame = ({ players, onClose }: PlayerProps) => {
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
    <div className={styles.container}>
      <div className={styles.modal}>
        <CloseButton onClose={onClose} />
        <PlayerLabel type="winner" />
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
        <PlayerLabel type="loser" />
      </div>
    </div>
  )
}

export default AddGame