// disable annoying esling warnings

/* eslint-disable react/require-default-props */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ChangeEventHandler, useState } from 'react'
import { FiX } from 'react-icons/fi'

import { Player } from '@common/types'
import useKeyPress from '@hooks/useKeyPress'
import usePlayers from '@hooks/usePlayers'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import styles from './PlayerSearchQueue.module.scss'

interface PlayerSearchQueueProps {
  handleSelect: (e: Player) => void
  placeholder?: string
  filterFunction?: (e: Player) => boolean
}

const PlayerSearchQueue = ({
  placeholder = 'Search for a player',
  handleSelect,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filterFunction = (_p: Player) => true,
}: PlayerSearchQueueProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { players, setQuery } = usePlayers(400)
  const filteredPlayers = players.filter(filterFunction ?? (() => true))
  const { handleKeyPress, selectedIdx, setSelectedIdx } = useKeyPress(filteredPlayers, handleSelect)
  const [parent, _enableAnimations] = useAutoAnimate<HTMLUListElement>({ duration: 200 })

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setQuery(e.target.value)
    setIsVisible(true)
    setSelectedIdx(0)
  }

  return (
    <div className={styles.container}>
      <label htmlFor="queue" className={isVisible ? styles.search__visible : styles.search}>
        <input
          className={styles.input}
          id="queue"
          placeholder={placeholder}
          onClick={() => setIsVisible(true)}
          onKeyDown={handleKeyPress}
          onChange={handleChange}
        />
        <button
          className={isVisible ? styles.button__visible : styles.button}
          onClick={() => setIsVisible(false)}
        >
          <FiX />
        </button>
      </label>
      <ul ref={parent} className={isVisible ? styles.results__visible : styles.results}>
        {filteredPlayers.map((player, i) => (
          <li
            key={player.id}
            className={`${styles.player} ${selectedIdx === i ? styles.selected : ''}`}
            onClick={() => handleSelect(filteredPlayers[i])}
          >
            {`${player.firstName} ${player.lastName}`}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PlayerSearchQueue
