import { NewGame, PlayerWithStats } from '@common/types'
import { useState } from 'react'
import PlayerSearch from './PlayerSearch'
import PlayerList from './PlayerList'
import styles from './AddGame.module.scss'
import PlayerLabel from './PlayerLabel'
import Queue from './Queue'
import ChosenPlayer from './ChosenPlayer'

type PlayerProps = { players: PlayerWithStats[] }

const AddGame = ({ players }: PlayerProps) => {
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

  // const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   const res = await axios.post(`${NEXT_PUBLIC_API_URL}/game`, game)
  //   console.log(res.data)
  // }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <PlayerLabel type="winner" />
        <div className={styles.cardWrapper}>
          <div className={styles.cardLabel}>
            <h3>New Game</h3>
          </div>
          <div className={styles.card}>
            <div className={styles.cardColumn}>
              {game.winnerId ? (
                <ChosenPlayer
                  player={players.find(p => p.id === game.winnerId) as PlayerWithStats}
                  onClear={() => setGameField('winnerId')(undefined)}
                />
              ) : (
                <>
                  <div className={styles.searchCard}>
                    <Queue onChoose={setGameField('winnerId')} players={playerLists.winner} />
                  </div>
                  <div className={styles.searchCard}>
                    <PlayerSearch
                      closeSearch={resetPlayers('winner')}
                      setPlayers={setPlayers('winner')}
                    />
                    <PlayerList onChoose={setGameField('winnerId')} players={playerLists.winner} />
                  </div>
                </>
              )}
            </div>
            <div className={styles.buttonWrapper}>
              <button type="button">Add Game</button>
            </div>
            <div className={styles.cardColumn}>
              {game.loserId ? (
                <ChosenPlayer
                  player={players.find(p => p.id === game.loserId) as PlayerWithStats}
                  onClear={() => setGameField('loserId')(undefined)}
                />
              ) : (
                <>
                  <div className={styles.searchCard}>
                    <Queue onChoose={setGameField('loserId')} players={playerLists.loser} />
                  </div>
                  <div className={styles.searchCard}>
                    <PlayerSearch
                      closeSearch={resetPlayers('loser')}
                      setPlayers={setPlayers('loser')}
                    />
                    <PlayerList onChoose={setGameField('loserId')} players={playerLists.loser} />
                  </div>
                </>
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
