// disable annoying esling warnings

/* eslint-disable react/require-default-props */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ChangeEventHandler, useState } from 'react'

import { Player } from '@common/types'
import useKeyPress from '@hooks/useKeyPress'
import usePlayers from '@hooks/usePlayers'

import styles from './PlayerSearchQueue.module.scss'

interface PlayerSearchLinkProps {
  handleSelect: (e: Player) => void
  placeholder?: string
  filterFunction?: (e: Player) => boolean
}

const PlayerSearchLink = ({
  placeholder = 'Search for a player',
  handleSelect,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filterFunction = (_p: Player) => true,
}: PlayerSearchLinkProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { players, setQuery } = usePlayers(400)
  const filteredPlayers = players.filter(filterFunction ?? (() => true))
  const { handleKeyPress, selectedIdx, setSelectedIdx } = useKeyPress(filteredPlayers, handleSelect)

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setQuery(e.target.value)
    setIsVisible(true)
    setSelectedIdx(0)
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        placeholder={placeholder}
        onClick={() => setIsVisible(true)}
        onKeyDown={handleKeyPress}
        onChange={handleChange}
        onBlur={() => setIsVisible(false)}
      />
      {isVisible && (
        <ul className={styles.results}>
          {filteredPlayers.map((player, i) => (
            <li
              key={player.id}
              className={`${styles.player} ${selectedIdx === i ? styles.selected : ''}`}
              onMouseDown={e => e.preventDefault()} // We need to block the onBlur effect first: https://stackoverflow.com/questions/17769005/onclick-and-onblur-ordering-issue/#57630197
              onClick={() => handleSelect(filteredPlayers[i])}
            >
              {`${player.firstName} ${player.lastName}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PlayerSearchLink
