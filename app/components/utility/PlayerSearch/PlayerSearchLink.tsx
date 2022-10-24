import usePlayers from '@hooks/usePlayers'
import useKeyPress from '@hooks/useKeyPress'
import Link from 'next/link'
import Router from 'next/router'
import { ChangeEventHandler, useState } from 'react'
import styles from './PlayerSearchLink.module.scss'

const PlayerSearchLink = () => {
  const createEnterFunction = (baseRoute: string) => {
    function onEnter(id: number) {
      Router.push(`${baseRoute}/${id}`)
    }
    return onEnter
  }

  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { players, setQuery } = usePlayers(400)
  const { handleKeyPress, selectedIdx, setSelectedIdx } = useKeyPress(
    players,
    createEnterFunction('player')
  )

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setQuery(e.target.value)
    setIsVisible(true)
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
      <ul className={styles.results}>
        {isVisible &&
          players.map((player, i) => (
            <Link href={`/player/${player.id}`} key={player.id}>
              <a>
                <li
                  className={`${styles.player} ${selectedIdx === i ? styles.selected : ''}`}
                  onMouseDown={e => e.preventDefault()} // We need to block the onBlur effect first: https://stackoverflow.com/questions/17769005/onclick-and-onblur-ordering-issue/#57630197
                >
                  {`${player.firstName} ${player.lastName}`}
                </li>
              </a>
            </Link>
          ))}
      </ul>
    </div>
  )
}

export default PlayerSearchLink
