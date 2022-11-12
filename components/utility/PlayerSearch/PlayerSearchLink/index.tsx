// disable annoying esling warnings

/* eslint-disable react/require-default-props */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ChangeEventHandler, useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'

import { Player } from '@common/types'
import useKeyPress from '@hooks/useKeyPress'
import usePlayers from '@hooks/usePlayers'

import styles from './PlayerSearchLink.module.scss'

const PlayerSearchLink = () => {
  const getRoute = (id: number) => `player/${id}`
  const handleSelect = ({ id }: Player) => Router.push(getRoute(id))

  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { players, setQuery } = usePlayers(400)
  const { handleKeyPress, selectedIdx, setSelectedIdx } = useKeyPress(players, handleSelect)

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setQuery(e.target.value)
    setIsVisible(true)
    setSelectedIdx(0)
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        placeholder={'Search for a player'}
        onClick={() => setIsVisible(true)}
        onKeyDown={handleKeyPress}
        onChange={handleChange}
        onBlur={() => setIsVisible(false)}
      />
      {isVisible && (
        <ul className={styles.results}>
          {players.map((player, i) => (
            <Link href={getRoute(player.id)} passHref>
              <li
                key={player.id}
                className={`${styles.player} ${selectedIdx === i ? styles.selected : ''}`}
                onMouseDown={e => e.preventDefault()} // We need to block the onBlur effect first: https://stackoverflow.com/questions/17769005/onclick-and-onblur-ordering-issue/#57630197
                onClick={() => handleSelect(players[i])}
              >
                <a>{`${player.firstName} ${player.lastName}`}</a>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PlayerSearchLink
