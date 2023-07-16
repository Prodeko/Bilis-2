import type { Player } from '@common/types'
import { NOF_LATEST_PLAYERS, NOF_LEADERBOARD_PLAYERS } from '@common/utils/constants'
import { Header } from '@components/ui/Header/Main'
import { getRecentGames } from '@server/db/games/derivatives'
import { getLatestPlayers, getPlayers } from '@server/db/players'

import styles from './Home.module.scss'
import HomeLayout from './HomeLayout'

export default async function Page() {
  const [leaderboard, recentPlayers, recentGames] = await Promise.all([
    getPlayers(NOF_LEADERBOARD_PLAYERS).then(players =>
      players.map(player => player.toJSON())
    ) as Promise<Player[]>,
    getLatestPlayers(NOF_LATEST_PLAYERS),
    getRecentGames(100),
  ])

  return (
    <div tabIndex={-1} className={styles.grid__layout}>
      <Header />
      <HomeLayout
        leaderboard={leaderboard}
        recentPlayers={recentPlayers}
        recentGames={recentGames}
      />
    </div>
  )
}

export const dynamic = 'force-dynamic'
