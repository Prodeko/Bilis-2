'use client'

import AddGameButton from 'app/components/Homepage/AddGame'
import Games from 'app/components/Homepage/Games'
import Leaderboard from 'app/components/Homepage/Leaderboard'
import Queue from 'app/components/Homepage/Queue'
import Header from 'app/components/ui/Header/Main'
import { ComponentProps, KeyboardEventHandler, useState } from 'react'

import { Player, RecentGame } from '@common/types'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { QueueProvider, reducer } from '@state/Queue'

import styles from './HomeLayout.module.scss'

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
    // add id so that we can set the focus on this after a new game is added
    <div
      {...props}
      ref={parent}
      id="home-layout"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className={styles['grid__layout']}
    >
      <Header />
      <QueueProvider reducer={reducer}>
        <div {...props} className={styles['grid__content']}>
          <Leaderboard
            leaderboard={leaderboard}
            gridPosition={{
              gridColumnStart: '1',
              gridColumnEnd: '2',
              gridRowStart: '1',
              gridRowEnd: '3',
            }}
          />
          <Queue
            gridPosition={{
              gridColumnStart: '2',
              gridColumnEnd: '3',
              gridRowStart: '1',
              gridRowEnd: '2',
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
            gridPosition={{
              gridColumnStart: '2',
              gridColumnEnd: '-1',
              gridRowStart: '2',
              gridRowEnd: '-1',
            }}
          />
        </div>
      </QueueProvider>
    </div>
  )
}

export default HomeLayout
