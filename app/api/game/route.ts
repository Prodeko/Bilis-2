import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

import { createGameType } from '@common/types'
import { createGame, removeLatestGame } from '@server/db/games'
import { formatRecentGame } from '@server/db/games/derivatives'

export async function POST(req: Request) {
  const json = await req.json()
  const parsedCreateGameType = createGameType.parse(json)
  const game = await createGame(parsedCreateGameType)
  const jsonGame = formatRecentGame(game)
  revalidatePath('/stats')

  return NextResponse.json({ recentGame: jsonGame, winner: game.winner, loser: game.loser })
}

export async function DELETE() {
  const removedLatestGame = await removeLatestGame()
  return NextResponse.json(removedLatestGame)
}
