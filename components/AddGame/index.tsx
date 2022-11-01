import { NewGame, PlayerWithStats } from '@common/types'
import { useState } from 'react'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import axios from 'axios'
import styles from './AddGame.module.scss'
import PlayerLabel from './PlayerLabel'
import CloseButton from './CloseButton'
import ChosenPlayer from './ChosenPlayer'
import ChoosePlayer from './ChoosePlayer'
import UnderTableInput from './UnderTableInput'

type PlayerProps = { players: PlayerWithStats[]; onClose: () => void }

const AddGame = ({ players, onClose }: PlayerProps) => {
  const [playerLists, setPlayerLists] = useState<{
    winner: PlayerWithStats[]
    loser: PlayerWithStats[]
  }>({
    winner: players,
    loser: players,
  })

  const [game, setGame] = useState<Partial<NewGame>>({
    underTable: false,
  })

  const setGameField = (key: keyof NewGame) => (val: any) => {
    setGame({ ...game, [key]: val })
  }

  const resetPlayers = (side: 'winner' | 'loser') => () => {
    setPlayerLists(prev => ({ ...prev, [side]: players }))
  }

  const setPlayers = (side: 'winner' | 'loser') => (p: PlayerWithStats[]) => {
    setPlayerLists(prev => ({
      ...prev,
      [side]: p,
    }))
  }

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
          <div className={styles.cardLabel}>
            <h3>New Game</h3>
          </div>
          <div className={styles.card}>
            <div className={game.winnerId ? styles.cardColumn__selected : styles.cardColumn}>
              {game.winnerId ? (
                <ChosenPlayer
                  player={players.find(p => p.id === game.winnerId) as PlayerWithStats}
                  onClear={() => setGameField('winnerId')(undefined)}
                />
              ) : (
                <ChoosePlayer
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
                <ChosenPlayer
                  player={players.find(p => p.id === game.loserId) as PlayerWithStats}
                  onClear={() => setGameField('loserId')(undefined)}
                />
              ) : (
                <ChoosePlayer
                  onChoose={setGameField('loserId')}
                  players={playerLists.loser}
                  closeSearch={resetPlayers('loser')}
                  setPlayers={setPlayers('loser')}
                />
              )}
            </div>
          </div>
        </div>
        <PlayerLabel type="loser" />
      </div>
    </div>
  )
}

export default AddGame
