import type { NextPage } from 'next'
import { KeyboardEventHandler, useState } from 'react'

import type { Player, RecentGame } from '@common/types'
import { NOF_LATEST_PLAYERS, NOF_LEADERBOARD_PLAYERS } from '@common/utils/constants'
import AddGameButton from '@components/Homepage/AddGame'
import Games from '@components/Homepage/Games'
import Leaderboard from '@components/Homepage/Leaderboard'
import Queue from '@components/Homepage/Queue'
import RandomPlayer from '@components/Homepage/RandomPlayer'
import HomeGrid from '@components/Layout/HomeLayout/HomeGrid'
import HomeLayout from '@components/Layout/HomeLayout/HomeLayout'
import HeaderTitle from '@components/ui/Header/HeaderTitle'
import { getRecentGames } from '@server/db/games/derivatives'
import { getLatestPlayers, getPlayers, getRandomPlayer } from '@server/db/players'
import { QueueProvider, reducer } from '@state/Queue'
import Header from '@ui/Header'

interface Props {
  leaderboard: Player[]
  recentPlayers: Player[]
  randomPlayer: Player
  recentGames: RecentGame[]
}

const Home: NextPage<Props> = ({
  leaderboard,
  recentPlayers,
  randomPlayer,
  recentGames,
}: Props) => {
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
    <HomeLayout onKeyDown={handleKeyDown}>
      <Header
        TitleComponent={<HeaderTitle title="Biliskilke" />}
        RightComponent={<RandomPlayer randomPlayer={randomPlayer} />}
        leftColumnSpan={4}
        rightColumnSpan={4}
      />
      <QueueProvider reducer={reducer}>
        <HomeGrid>
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
        </HomeGrid>
      </QueueProvider>
    </HomeLayout>
  )
}

export async function getServerSideProps() {
  const [leaderboard, recentPlayers, randomPlayer, recentGames] = await Promise.all([
    getPlayers(NOF_LEADERBOARD_PLAYERS).then(players => players.map(player => player.toJSON())),
    getLatestPlayers(NOF_LATEST_PLAYERS).then(players => players.map(player => player.toJSON())),
    getRandomPlayer().then(player => player?.toJSON()),
    getRecentGames(100),
  ])

  return { props: { leaderboard, recentPlayers, randomPlayer, recentGames } }
}

export default Home
