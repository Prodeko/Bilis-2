// disable annoying esling warnings

/* eslint-disable react/require-default-props */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ChangeEventHandler } from 'react'
import Router from 'next/router'
import Link from 'next/link'

import { Player } from '@common/types'
import useKeyPress from '@hooks/useKeyPress'
import usePlayers from '@hooks/usePlayers'

import styles from './PlayerSearchLink.module.scss'

interface Props {
  visible: boolean
  onClick: () => void
  onBlur: () => void
}

const PlayerSearchLink = ({ visible, onClick, onBlur }: Props) => {
  const getRoute = (id: number) => `player/${id}`
  const handleSelect = ({ id }: Player) => Router.push(getRoute(id))

  const { players, setQuery } = usePlayers(400)
  const { handleKeyPress, selectedIdx, setSelectedIdx } = useKeyPress(players, handleSelect)

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setQuery(e.target.value)
    onClick()
    setSelectedIdx(0)
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        placeholder={'Search for a player'}
        onClick={onClick}
        onKeyDown={handleKeyPress}
        onChange={handleChange}
        onBlur={onBlur}
      />
      <ul className={visible ? styles.results__visible : styles.results}>
        {players.length > 0 ? (
          players.map((player, i) => (
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
          ))
        ) : (
          <li className={styles.noplayers}>No Players Found</li>
        )}
      </ul>
    </div>
  )
}

export default PlayerSearchLink
