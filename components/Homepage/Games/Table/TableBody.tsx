import styles from './Table.module.scss'
import GamesRow from './GamesRow'
import { RecentGame } from '@common/types'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { NEXT_PUBLIC_API_URL } from '@config/index'

interface Props {
  games: RecentGame[]
  setGames: Dispatch<SetStateAction<RecentGame[]>>
}

const TableBody = ({ games, setGames }: Props) => {
  const [page, setPage] = useState(1)
  const loader = useRef(null)

  useEffect(() => {
    axios
      .get(`${NEXT_PUBLIC_API_URL}/game/recents`, {
        params: {
          offset: page,
        },
      })
      .then(res => {
        setGames(prev => [...new Set([...prev, ...res.data])])
      })
  }, [page])

  const handleObserver = useCallback(entries => {
    const target = entries[0]
    if (target.isIntersecting) {
      setPage(prev => prev + 1)
    }
  }, [])

  useEffect(() => {
    const option = {
      root: document.querySelector('#games'),
      rootMargin: '40px',
      threshold: 0,
    }
    const observer = new IntersectionObserver(handleObserver, option)
    if (loader.current) observer.observe(loader.current)
  }, [handleObserver])

  return (
    <tbody id="games" className={styles.tablebody}>
      {games.map(game => {
        return <GamesRow key={game.id} game={game} />
      })}
      <div ref={loader} />
    </tbody>
  )
}

export default TableBody
