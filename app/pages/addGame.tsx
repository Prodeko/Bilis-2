import { NewGame } from '@common/types'
import type { NextPage } from 'next'
import { FormEvent, useState } from 'react'

const Home: NextPage = () => {
  const [game, setGame] = useState<Partial<NewGame>>({
    underTable: false,
    winnerElo: 400,
    loserElo: 400,
  })

  const setGameField = (key: keyof NewGame) => (val: any) => {
    setGame({ ...game, [key]: val })
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(game)
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
