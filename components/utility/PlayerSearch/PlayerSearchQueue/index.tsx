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
  const [{ queue }, dispatch] = useStateValue()
  const [visible, setVisible] = useState<boolean>(false)
  const { players, setQuery } = usePlayers(400)
  const filteredPlayers = players.filter(
    player => !queue.some(queuePlayer => queuePlayer.id === player.id)
  )
  const [parent, _enableAnimations] = useAutoAnimate<HTMLUListElement>({ duration: 200 })

  const openDropdown = () => setVisible(true)
  const closeDropdown = () => setVisible(false)

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setQuery(e.target.value)
    openDropdown()
    setSelectedIdx(0)
  }

  const handleSelect = (player: Player) => {
    dispatch(addToQueue(player))
  }

  const { handleKeyPress, selectedIdx, setSelectedIdx } = useKeyPress(filteredPlayers, handleSelect)

  return (
    <div className={styles.container}>
      <label htmlFor="queue" className={visible ? styles.search__visible : styles.search}>
        <input
          className={styles.input}
          id="queue"
          placeholder={'Add player to queue'}
          onClick={openDropdown}
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          autoComplete="off"
        />
        <button
          className={visible ? styles.button__visible : styles.button}
          onClick={closeDropdown}
        >
          <FiX />
        </button>
      </label>
      <ul ref={parent} className={visible ? styles.results__visible : styles.results}>
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((player, i) => (
            <li
              key={player.id}
              className={`${styles.player} ${selectedIdx === i ? styles.selected : ''}`}
              onClick={() => handleSelect(filteredPlayers[i])}
            >
              <span className={styles.id}>{`#${player.id}`}</span>
              <span
                className={styles.name}
              >{`${player.firstName} "${player.nickname}" ${player.lastName}`}</span>
            </li>
          ))
        ) : (
          <li className={styles.noplayers}>No Players Found</li>
        )}
      </ul>
    </div>
  )
}

export default PlayerSearchQueue
