'use client'

// disable annoying esling warnings

/* eslint-disable react/require-default-props */
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEventHandler } from 'react'

import { Player } from '@common/types'
import { useAutoAnimate } from '@formkit/auto-animate/react'
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
  const router = useRouter()
  const handleSelect = ({ id }: Player) => router.push(getRoute(id))

  const { players, setQuery } = usePlayers(300)
  const { handleKeyPress, selectedIdx, setSelectedIdx } = useKeyPress(players, handleSelect)
  const [parent, enableAnimations] = useAutoAnimate<HTMLUListElement>({ duration: 300 })

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    enableAnimations(false)
    setTimeout(() => enableAnimations(true), 300)
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
      {/* The following line keeps the borders round, even if the list is not 100% height */}
      <div className={styles.playerWrapper}>
        <ul ref={parent} className={visible ? styles.results__visible : styles.results}>
          {players.length > 0 ? (
            players.map((player, i) => (
              <Link key={player.id} href={getRoute(player.id)} passHref>
                <li
                  className={`${styles.player} ${selectedIdx === i ? styles.selected : ''}`}
                  onMouseDown={e => e.preventDefault()} // We need to block the onBlur effect first: https://stackoverflow.com/questions/17769005/onclick-and-onblur-ordering-issue/#57630197
                  onClick={() => handleSelect(players[i])}
                >
                  <span>#{player.id}</span>
                  <span>{`${player.firstName} "${player.nickname}" ${player.lastName}`}</span>
                  <span>{Math.floor(player.elo)}</span>
                </li>
              </Link>
            ))
          ) : (
            <li className={styles.noplayers}>No Players Found</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default PlayerSearchLink
