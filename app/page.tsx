import { NextPage } from 'next'

import type { Player } from '@common/types'
import { NOF_LATEST_PLAYERS, NOF_LEADERBOARD_PLAYERS } from '@common/utils/constants'
import { Header } from '@components/ui/Header/Main'
import useSeasonalMode from '@hooks/useSeasonalMode'
import { getRecentGames } from '@server/db/games/derivatives'
import { getLatestPlayers, getPlayers } from '@server/db/players'
import { getFormattedPlayers } from '@server/db/players/derivatives'
import { getCurrentSeason } from '@server/db/seasons'

import styles from './Home.module.scss'
import HomeLayout from './HomeLayout'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const seasonal = searchParams?.seasonal === 'true'
  const [leaderboard, recentPlayers, recentGames] = await Promise.all([
    getFormattedPlayers(NOF_LEADERBOARD_PLAYERS, seasonal),
    getLatestPlayers(NOF_LATEST_PLAYERS),
    getRecentGames(100, seasonal),
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
