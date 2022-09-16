import { NewGame } from '@common/types'
import axios from 'axios'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import type { NextPage } from 'next'
import { FormEvent, useState } from 'react'
import { Player } from '@common/types'

type ListProps = { players: Player[]; onChosen: (id: number) => void; chosen: number | undefined }

const PlayerList = ({ players, onChosen, chosen }: ListProps) => {
  return (
    <div style={{ width: 400 }}>
      {players.map(p => (
        <div
          style={{
            width: '100%',
            padding: 5,
            background: chosen === p.id ? '#fafafa' : 'transparent',
          }}
          key={p.id}
          onClick={() => onChosen(p.id)}
        >
          <h1>
            {p.firstName} {p.lastName}: {p.elo}
          </h1>
        </div>
      ))}
    </div>
  )
}

type PlayerProps = { players: Player[] }

const Home: NextPage<PlayerProps> = ({players}: PlayerProps) => {
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

  return (
    <>
      <h3>Creating a new game</h3>
      <form onSubmit={onSubmit}>
        <h1>WINNER</h1>
        <PlayerList onChosen={setGameField('winnerId')} players={players} chosen={game.winnerId} />
        <br />
        <h1>LOSER</h1>
        <PlayerList onChosen={setGameField('loserId')} players={players} chosen={game.loserId} />

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

export async function getServerSideProps() {
  const res = await axios.get(`${NEXT_PUBLIC_API_URL}/player/latest`)
  const players = res.data
  return { props: { players } }
}

export default Home
