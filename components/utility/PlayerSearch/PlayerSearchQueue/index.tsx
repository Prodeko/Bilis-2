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
import { addToQueue, useStateValue } from '@state/Queue'

import styles from './PlayerSearchQueue.module.scss'

const PlayerSearchQueue = () => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setQuery(e.target.value)
    setIsVisible(true)
    setSelectedIdx(0)
  }

  const handleSelect = (player: Player) => {
    dispatch(addToQueue(player))
  }

  const [{ queue }, dispatch] = useStateValue()
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { players, setQuery } = usePlayers(400)
  const filteredPlayers = players.filter(
    player => !queue.some(queuePlayer => queuePlayer.id === player.id)
  )
  const { handleKeyPress, selectedIdx, setSelectedIdx } = useKeyPress(filteredPlayers, handleSelect)
  const [parent, _enableAnimations] = useAutoAnimate<HTMLUListElement>({ duration: 200 })

  return (
    <div className={styles.container}>
      <label htmlFor="queue" className={isVisible ? styles.search__visible : styles.search}>
        <input
          className={styles.input}
          id="queue"
          placeholder={'Add player to queue'}
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
            {`#${player.id} ${player.firstName} "${player.nickname}" ${player.lastName}`}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PlayerSearchQueue
