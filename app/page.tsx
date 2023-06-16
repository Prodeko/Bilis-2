import HomeLayout from './HomeLayout'

import type { Player, RecentGame } from '@common/types'
import { NOF_LATEST_PLAYERS, NOF_LEADERBOARD_PLAYERS } from '@common/utils/constants'
import { getRecentGames } from '@server/db/games/derivatives'
import { getLatestPlayers, getPlayers } from '@server/db/players'
import { Header } from '@components/ui/Header/Main'

import styles from './Home.module.scss'

type HomeData = [Player[], Player[], RecentGame[]]

const fetchHomepageData = async (): Promise<HomeData> => {
  return await Promise.all([
    getPlayers(NOF_LEADERBOARD_PLAYERS).then(players =>
      players.map(player => player.toJSON())
    ) as Promise<Player[]>,
    getLatestPlayers(NOF_LATEST_PLAYERS).then(players =>
      players.map(player => player.toJSON())
    ) as Promise<Player[]>,
    getRecentGames(100),
  ])
}

export default async function Home() {
  const [leaderboard, recentPlayers, recentGames] = await fetchHomepageData()
  return (
    <div
      tabIndex={-1}
      className={styles.grid__layout}
    >
      <Header />
      <HomeLayout leaderboard={leaderboard} recentPlayers={recentPlayers} recentGames={recentGames} />
    </div>
  )
}
