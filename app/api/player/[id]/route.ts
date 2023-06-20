import { NextRequest, NextResponse } from 'next/server'

import { id as idParser, newPlayer, player as playerParser } from '@common/types'
import { getPlayerStats } from '@server/db/games/derivatives'
import { getPlayerById, updatePlayerById } from '@server/db/players'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = idParser.parse(Number(params.id))
  const [player, playerStats] = await Promise.all([getPlayerById(id), getPlayerStats(id)])
  const parsedPlayer = playerParser.parse(player?.toJSON())
  return NextResponse.json({
    ...parsedPlayer,
    ...playerStats,
  })
}

export async function PUT(req: NextRequest, { params }: { params: { id: number } }) {
  const id = idParser.parse(Number(params.id))

  const playerData = await req.json()
  const parsedPartialNewPlayer = newPlayer.partial().parse(playerData)

  const updatedPlayer = (await updatePlayerById(id, parsedPartialNewPlayer)).toJSON()
  const parsedUpdatedPlayer = playerParser.parse(updatedPlayer)
  return NextResponse.json(parsedUpdatedPlayer)
}
