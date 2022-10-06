import axios from 'axios'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import { FormEvent, useState } from 'react'
import { NewGame, Player } from '@common/types'
import PlayerSearch from './PlayerSearch'
import PlayerList from './PlayerList'

type PlayerProps = { players: Player[] }

const AddGame = ({ players }: PlayerProps) => {
  const [playerLists, setPlayerLists] = useState<{ winner: Player[]; loser: Player[] }>({
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

  const setPlayers = (side: 'winner' | 'loser') => (p: Player[]) => {
    setPlayerLists(prev => ({
      ...prev,
      [side]: p,
    }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const res = await axios.post(`${NEXT_PUBLIC_API_URL}/game`, game)
  }

  return (
    <>
      <h3>Creating a new game</h3>
      <form onSubmit={onSubmit}>
        <h1>WINNER</h1>
        <PlayerSearch closeSearch={resetPlayers('winner')} setPlayers={setPlayers('winner')} />
        <PlayerList
          onChoose={setGameField('winnerId')}
          players={playerLists.winner}
          chosen={game.winnerId}
        />
        <br />
        <h1>LOSER</h1>
        <PlayerSearch closeSearch={resetPlayers('loser')} setPlayers={setPlayers('loser')} />
        <PlayerList
          onChoose={setGameField('loserId')}
          players={playerLists.loser}
          chosen={game.loserId}
        />

        <input
          onChange={item => setGameField('underTable')(item.target.checked)}
          title="Under table"
          type="checkbox"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default AddGame
