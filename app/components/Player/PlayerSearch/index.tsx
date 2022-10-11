import { Player } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import axios from 'axios'
import useDebounce from 'hooks/useDebounce'
import useDelayedCall from 'hooks/useDelayedCall'
import usePlayers from 'hooks/usePlayers'
import Link from 'next/link'
import Router from 'next/router'
import {
  ChangeEvent,
  ChangeEventHandler,
  FunctionComponent,
  KeyboardEventHandler,
  useEffect,
  useState,
} from 'react'
import { useStateManager } from 'react-select'
import styles from './PlayerSearch.module.scss'

const PlayerSearch = () => {
  const [query, setQuery] = useDebounce<string>('', 400)
  const [players, setPlayers] = useState<Player[]>([])
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [selectedIdx, setSelectedIdx] = useState<number>(0)

  useEffect(() => {
    const search = async (q: string) => {
      const res = await axios.get(`${NEXT_PUBLIC_API_URL}/player`, {
        params: { query: q },
      })
      setPlayers(res.data)
    }

    if (query.length !== 0) {
      search(query)
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = e => {
    switch (e.key) {
      case 'ArrowUp':
        setSelectedIdx(Math.max(0, selectedIdx - 1))
        break

      case 'ArrowDown':
        setSelectedIdx(Math.min(players.length, selectedIdx + 1))
        break

      case 'Enter':
        const id = players[selectedIdx].id
        Router.push(`player/${id}`)
        break
    }
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setQuery(e.target.value)
    setSelectedIdx(0)
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        placeholder="Search for a player"
        onClick={() => {
          if (!isVisible) setIsVisible(true)
        }}
        onKeyDown={handleKeyPress}
        onChange={handleChange}
        onBlur={() => {
          if (isVisible) setIsVisible(false)
        }}
      />
      <div className={styles.results}>
        {isVisible &&
          players.map((player, i) => (
            <Link href={`/player/${player.id}`} key={player.id}>
              <div
                className={`${styles.player} ${selectedIdx === i ? styles.selected : ''}`}
              >{`${player.firstName} ${player.lastName}`}</div>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default PlayerSearch
