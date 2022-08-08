import { NewGame } from '@common/types'
import axios from 'axios'
import { NEXT_PUBLIC_API_URL } from '@config'
import type { NextPage } from 'next'
import { FormEvent, useState } from 'react'

const Home: NextPage = () => {
  const [game, setGame] = useState<Partial<NewGame>>({
    underTable: false,
    winnerEloAfter: 420,
    winnerEloBefore: 400,
    loserEloBefore: 400,
    loserEloAfter: 375,
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
        <input
          onChange={item => setGameField('winnerId')(parseInt(item.target.value))}
          placeholder="Winner"
          type="number"
        />
        <input
          onChange={item => setGameField('loserId')(parseInt(item.target.value))}
          placeholder="Player 2"
          type="number"
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

export default Home
