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

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const res = await axios.post(`${NEXT_PUBLIC_API_URL}/game`, game)
  }

  return (
    <>
      <h3>Creating a new game</h3>
      <form onSubmit={onSubmit}>
        <h1>WINNER</h1>
        <PlayerSearch
          onSearchDone={p => setPlayerLists({ ...playerLists, winner: p })}
          onSearchActiveChanged={active =>
            setPlayerLists({ ...playerLists, winner: active ? playerLists.winner : players })
          }
        />
        <PlayerList
          onChoose={setGameField('winnerId')}
          players={playerLists.winner}
          chosen={game.winnerId}
        />
        <br />
        <h1>LOSER</h1>
        <PlayerSearch
          onSearchDone={p => setPlayerLists({ ...playerLists, loser: p })}
          onSearchActiveChanged={active =>
            setPlayerLists({ ...playerLists, loser: active ? playerLists.loser : players })
          }
        />
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
