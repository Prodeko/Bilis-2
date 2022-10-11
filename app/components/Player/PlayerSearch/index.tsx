import { Player } from '@common/types'
import usePlayers from 'hooks/usePlayers'
import Link from 'next/link'
import Router from 'next/router'
import {
  ChangeEvent,
  ChangeEventHandler,
  FunctionComponent,
  KeyboardEventHandler,
  useState,
} from 'react'
import { useStateManager } from 'react-select'
import styles from './PlayerSearch.module.scss'

interface PlayerSearchProps {
  initialPlayers: Player[]
}

const PlayerSearch: FunctionComponent<PlayerSearchProps> = ({ initialPlayers: players }) => {
  const [query, setQuery] = useState<string>('')
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [selectedIdx, setSelectedIdx] = useState<number>(0)

  const filteredPlayers = players.filter(p => new RegExp(query, 'i').test(p.firstName + p.lastName))

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = e => {
    switch (e.key) {
      case 'ArrowUp':
        setSelectedIdx(Math.max(0, selectedIdx - 1))
        break

      case 'ArrowDown':
        setSelectedIdx(Math.min(filteredPlayers.length, selectedIdx + 1))
        break

      case 'Enter':
        const id = filteredPlayers[selectedIdx].id
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
          filteredPlayers.map((player, i) => (
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
