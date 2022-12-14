import axios from 'axios'
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'

import { RecentGame } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import GamesRow from './GamesRow'
import styles from './Table.module.scss'

interface Props {
  games: RecentGame[]
  setGames: Dispatch<SetStateAction<RecentGame[]>>
  visible: boolean
}

const TableBody = ({ games, setGames, visible }: Props) => {
  const [parent, enableAnimations] = useAutoAnimate<HTMLTableSectionElement>({ duration: 200 })
  const [page, setPage] = useState(1)
  const loader = useRef(null)

  const [firstGame, ...otherGames] = games

  useEffect(() => {
    axios
      .get(`/api/game/recents`, {
        params: {
          offset: page,
        },
      })
      .then(res => {
        enableAnimations(false)
        setGames(prev => [...new Set([...prev, ...res.data])])
        setTimeout(() => enableAnimations(true), 100)
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
      rootMargin: '50%',
      threshold: 0,
    }
    const observer = new IntersectionObserver(handleObserver, option)
    if (loader.current) observer.observe(loader.current)
  }, [handleObserver])

  return (
    <tbody ref={parent} id="games" className={styles.tablebody}>
      <GamesRow key={firstGame.id} game={firstGame} pulsing={visible} />
      {otherGames.map(game => {
        return <GamesRow key={game.id} game={game} pulsing={false} />
      })}
      <tr ref={loader} />
    </tbody>
  )
}

export default TableBody
