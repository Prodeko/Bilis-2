import {  NextRequest, NextResponse } from 'next/server'
import { id, player } from '@common/types'
import { getPlayerById } from '@server/db/players'
import { getMutualGamesCount } from '@server/db/games/derivatives'
 
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const currentPlayerId = id.parse(Number(searchParams.get("currentPlayerId")))
  const opposingPlayerId = id.parse(Number(searchParams.get("opposingPlayerId")))
  const [currentPlayer, opposingPlayer] = await Promise.all([
    getPlayerById(currentPlayerId),
    getPlayerById(opposingPlayerId),
  ])

  const parsedCurrentPlayer = player.parse(currentPlayer)
  const parsedOpposingPlayer = player.parse(opposingPlayer)
  const mutualGames = await getMutualGamesCount(currentPlayerId, opposingPlayerId)
 
  return NextResponse.json({
    mutualGames,
    currentPlayer: parsedCurrentPlayer,
    opposingPlayer: parsedOpposingPlayer
  })
} 