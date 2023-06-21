'use client'

import { ComponentProps, KeyboardEventHandler, useState } from 'react'

import { Player, RecentGame } from '@common/types'
import AddGameButton from '@components/Homepage/AddGame'
import Games from '@components/Homepage/Games'
import { Leaderboard } from '@components/Homepage/Leaderboard'
import { Queue } from '@components/Homepage/Queue'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { QueueProvider, reducer } from '@state/Queue'

import styles from './Home.module.scss'

type DivProps = ComponentProps<'div'>

interface Props extends DivProps {
  leaderboard: Player[]
  recentPlayers: Player[]
  recentGames: RecentGame[]
}

const HomeLayout = ({ leaderboard, recentPlayers, recentGames, ...props }: Props) => {
  const [parent] = useAutoAnimate<HTMLDivElement>({ duration: 250 })
  const [games, setGames] = useState<RecentGame[]>(recentGames)
  const [gameModalOpen, setGameModalOpen] = useState(false)
  const closeModal = () => setGameModalOpen(false)
  const openModal = () => setGameModalOpen(true)

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.code === 'Space' && e.ctrlKey) openModal()
    if (e.code === 'Escape') {
      closeModal()
      document?.getElementById('home-layout')?.focus() // focus on the root element so pressing ctrl + space adds a new game
    }
    if (e.code === 'KeyQ') setTimeout(() => document?.getElementById('queue')?.focus(), 1)
  }

  return (
    <div
      id="home-layout"
      ref={parent}
      {...props}
      className={styles['grid__content']}
      onKeyDown={handleKeyDown}
    >
      <QueueProvider reducer={reducer}>
        <>
          <Leaderboard
            leaderboard={leaderboard}
            cardProps={{
              style: {
                gridColumnStart: '1',
                gridColumnEnd: '2',
                gridRowStart: '1',
                gridRowEnd: '-1',
              },
            }}
          />
          <Queue
            cardProps={{
              style: {
                gridColumnStart: '2',
                gridColumnEnd: '3',
                gridRowStart: '1',
                gridRowEnd: '2',
              },
            }}
          />
          <AddGameButton
            onClose={closeModal}
            onOpen={openModal}
            open={gameModalOpen}
            setGames={setGames}
            recentPlayers={recentPlayers}
          />
          <Games
            games={games}
            setGames={setGames}
            cardProps={{
              style: {
                gridColumnStart: '2',
                gridColumnEnd: '-1',
                gridRowStart: '2',
                gridRowEnd: '-1',
              },
            }}
          />
        </>
      </QueueProvider>
    </div>
  )
}

export default HomeLayout
