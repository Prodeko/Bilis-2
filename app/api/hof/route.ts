import { NextResponse } from 'next/server'

import {
  getHighestEloAllTimePlayer,
  getHighestStreak,
  getHighestWinPercentage,
  getMostGamesPlayed,
  getMostPlayedGamesInOneDay,
  getMostUndertableWins,
} from '@server/db/players/hofQueries'

export async function GET() {
  const hofPlayers = await Promise.all([
    getHighestEloAllTimePlayer(),
    getHighestStreak(),
    getHighestWinPercentage(),
    getMostGamesPlayed(),
    getMostUndertableWins(),
    getMostPlayedGamesInOneDay(),
  ])

  return NextResponse.json(hofPlayers)
}
