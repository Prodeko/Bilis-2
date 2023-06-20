import {  NextRequest, NextResponse } from 'next/server'
import { player as playerParser, newPlayer, id as idParser } from '@common/types'
import { getPlayerById, updatePlayerById } from '@server/db/players'
import { getPlayerStats } from '@server/db/games/derivatives'
 
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = idParser.parse(Number(params.id))
  const [player, playerStats] = await Promise.all([getPlayerById(id), getPlayerStats(id)])
  const parsedPlayer = playerParser.parse(player?.toJSON())
  return NextResponse.json({
    ...parsedPlayer,
    ...playerStats
  })
} 

export async function PUT(
  req: NextRequest, 
  { params }: { params: { id: number } }
) {
  const id = idParser.parse(Number(params.id))

  const playerData = await req.json()
  const parsedPartialNewPlayer = newPlayer.partial().parse(playerData)

  const updatedPlayer = (await updatePlayerById(id, parsedPartialNewPlayer)).toJSON()
  const parsedUpdatedPlayer = playerParser.parse(updatedPlayer)
  return NextResponse.json(parsedUpdatedPlayer)
}

