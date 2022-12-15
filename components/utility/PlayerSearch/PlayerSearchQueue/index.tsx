// disable annoying esling warnings

/* eslint-disable react/require-default-props */
import { ChangeEvent, MouseEvent, useState } from 'react'
import { FiX } from 'react-icons/fi'

import { Player } from '@common/types'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import useKeyPress from '@hooks/useKeyPress'
import usePlayers from '@hooks/usePlayers'
import { addToQueue, useQueueState } from '@state/Queue'

import styles from './PlayerSearchQueue.module.scss'

const PlayerSearchQueue = () => {
  const [{ queue }, dispatch] = useQueueState()
  const [visible, setVisible] = useState<boolean>(false)
  const { players, setQuery } = usePlayers(200)
  const filteredPlayers = players.filter(
    player => !queue.some(queuePlayer => queuePlayer.id === player.id)
  )
  const [parent, enableAnimations] = useAutoAnimate<HTMLUListElement>({ duration: 200 })

  const openDropdown = () => setVisible(true)
  const closeDropdown = () => setVisible(false)

  const clearInputField = (focusField: boolean) => {
    return () => {
      setQuery('') // Reset query
      const input = document?.getElementById?.('queue') as HTMLInputElement
      input.value = '' // Clear input field
      focusField && input.focus()
    }
  }

  // Disable animations while dropdown closes
  const handleBlur = () => {
    closeDropdown()
    enableAnimations(false)
    setTimeout(() => enableAnimations(true), 500)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setSelectedIdx(0)
  }

  const preventInputBlur = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  const handleSelect = (player: Player) => {
    dispatch(addToQueue(player))
    clearInputField(false)()
    closeDropdown()
  }

  const { handleKeyPress, selectedIdx, setSelectedIdx } = useKeyPress(filteredPlayers, handleSelect)

  return (
    <div className={styles.container}>
      <label htmlFor="queue" className={visible ? styles.search__visible : styles.search}>
        <input
          className={styles.input}
          id="queue"
          placeholder={'Add player to queue'}
          onFocus={openDropdown}
          onBlur={handleBlur}
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          autoComplete="off"
        />
        <button
          className={visible ? styles.button__visible : styles.button}
          onMouseDown={preventInputBlur}
          onClick={clearInputField(true)}
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
