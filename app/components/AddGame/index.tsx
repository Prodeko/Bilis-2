import axios from 'axios'
import type { NextPage } from 'next'
import { FormEvent, useEffect, useState } from 'react'

import { NewGame, Player } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import useDelayedCall from 'hooks/useDelayedCall'

type SearchProps = {
  onSearchDone: (players: Player[]) => void
  onSearchActiveChanged: (isActive: boolean) => void
}

const PlayerSearch = ({ onSearchActiveChanged, onSearchDone }: SearchProps) => {
  const [searchActive, setSearchActive] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const delayedCall = useDelayedCall({ delayMs: 1000 })

  useEffect(() => {
    onSearchActiveChanged(searchActive)
  }, [searchActive, onSearchActiveChanged])

  useEffect(() => {
    const search = async (q: string) => {
      const res = await axios.get(`${NEXT_PUBLIC_API_URL}/player`, {
        params: { query: q },
      })
      const players = res.data
      onSearchDone(players)
    }

    const isEmpty = query.length === 0
    if (isEmpty && searchActive) {
      setSearchActive(false)
    } else if (!isEmpty && !searchActive) {
      setSearchActive(true)
    } else if (!isEmpty) {
      delayedCall(() => search(query))
    }
  }, [query, delayedCall, searchActive, onSearchDone])

  return (
    <div>
      <input onChange={({ target }) => setQuery(target.value)} placeholder="Search for player..." />
    </div>
  )
}

type ListProps = { players: Player[]; onChosen: (id: number) => void; chosen: number | undefined }

const PlayerList = ({ players, onChosen, chosen }: ListProps) => {
  return (
    <div style={{ width: 400 }}>
      {players.map(p => (
        <button
          style={{
            width: '100%',
            padding: 5,
            background: chosen === p.id ? '#fafafa' : 'transparent',
          }}
          key={p.id}
          onClick={() => onChosen(p.id)}
          onKeyPress={() => onChosen(p.id)}
          type="button"
        >
          {p.firstName} {p.lastName}: {p.elo}
        </button>
      ))}
    </div>
  )
}

type PlayerProps = { players: Player[] }

const AddGame: NextPage<PlayerProps> = ({ players }: PlayerProps) => {
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
          onChosen={setGameField('winnerId')}
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
          onChosen={setGameField('loserId')}
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
