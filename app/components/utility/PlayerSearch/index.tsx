import type { CSSStyles } from '@common/types'
import { Player } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import useDebounce from '@hooks/useDebounce'
import useKeyPress from '@hooks/useKeyPress'
import axios from 'axios'
import Link from 'next/link'
import { ChangeEventHandler, useEffect, useState } from 'react'
import profileStyles from './ProfilePage.module.scss'
import landingPageStyles from './PlayerLandingPage.module.scss'

type Variation = 'profile' | 'landing'

const PlayerSearch = ({ variation }: { variation: Variation }) => {
  const styles: CSSStyles = variation.includes('profile') ? profileStyles : landingPageStyles

  const [query, setQuery] = useDebounce<string>('', 400)
  const [players, setPlayers] = useState<Player[]>([])
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { handleKeyPress, selectedIdx, setSelectedIdx } = useKeyPress(players, 'player')

  useEffect(() => {
    const search = async (q: string) => {
      const res = await axios.get(`${NEXT_PUBLIC_API_URL}/player`, {
        params: { query: q },
      })
      setPlayers(res.data)
    }

    if (query.length !== 0) {
      search(query)
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

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

export default PlayerSearch
