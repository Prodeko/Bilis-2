import HomeLayout from 'app/components/Layout/HomeLayout/HomeLayout'

import type { Player, RecentGame } from '@common/types'
import { NOF_LATEST_PLAYERS, NOF_LEADERBOARD_PLAYERS } from '@common/utils/constants'
import { getRecentGames } from '@server/db/games/derivatives'
import { getLatestPlayers, getPlayers, getRandomPlayer } from '@server/db/players'
import { Header } from '@components/ui/Header/Main'

import styles from '../app/components/Layout/HomeLayout/HomeLayout.module.scss'

type HomeData = [Player[], Player[], Player, RecentGame[]]

const fetchHomepageData = async (): Promise<HomeData> => {
  return await Promise.all([
    getPlayers(NOF_LEADERBOARD_PLAYERS).then(players =>
      players.map(player => player.toJSON())
    ) as Promise<Player[]>,
    getLatestPlayers(NOF_LATEST_PLAYERS).then(players =>
      players.map(player => player.toJSON())
    ) as Promise<Player[]>,
    getRandomPlayer().then(player => player?.toJSON()),
    getRecentGames(100),
  ])
}

export default async function Home() {
  const [leaderboard, recentPlayers, randomPlayer, recentGames] = await fetchHomepageData()
  return (
    <div
      tabIndex={-1}
      className={styles['grid__layout']}
    >
      <Header randomPlayer={randomPlayer} />
      <HomeLayout leaderboard={leaderboard} recentPlayers={recentPlayers} recentGames={recentGames} />
    </div>
  )
}
