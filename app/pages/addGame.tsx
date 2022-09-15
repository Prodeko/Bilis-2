import { NewGame } from '@common/types'
import axios from 'axios'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import type { NextPage } from 'next'
import { FormEvent, useState } from 'react'
import { Player } from '@common/types'

type ListProps = { players: Player[], onChosen: (id: number) => void }

const PlayerList = ({ players, onChosen }: ListProps) => {
  return (
    <div>
      {players.map(p => (
        <div key={p.id} onClick={() => onChosen(p.id)}>
          <h1>{p.firstName} {p.lastName}: {p.elo}</h1>
        </div>
      ))}
    </div>
  )
}

const Home: NextPage = () => {
  const [game, setGame] = useState<Partial<NewGame>>({
    underTable: false,
  })

  const setGameField = (key: keyof NewGame) => (val: any) => {
    setGame({ ...game, [key]: val })
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const res = await axios.post(`${NEXT_PUBLIC_API_URL}/game`, game)
    console.log(res.data)
  }

  // TODO fetch ~top 20 from db
  const testPlayers: Player[] = [{
    id: 1,
    firstName: "Teemu",
    lastName: "Selänne",
    nickname: "kiekko",
    elo: 400,
    emoji: "😎"
  },
  {
    id: 2,
    firstName: "Elvis",
    lastName: "Presley",
    nickname: "singa",
    elo: 450,
    emoji: "😎"
  },
  {
    id: 3,
    firstName: "Pekka",
    lastName: "Herlin",
    nickname: "kone",
    elo: 420,
    emoji: "😎"
  }]

  return (
    <>
      <h3>Creating a new game</h3>
      <form onSubmit={onSubmit}>

        <h1>WINNER</h1>
        <PlayerList onChosen={setGameField('winnerId')} players={testPlayers} />
        <br/>
        <h1>LOSER</h1>
        <PlayerList onChosen={setGameField('loserId')} players={testPlayers} />

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

export default Home
