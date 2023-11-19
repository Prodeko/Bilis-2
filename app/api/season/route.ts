import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

import { newSeason } from '@common/types'
import { createSeason } from '@server/db/seasons'

export async function POST(req: NextRequest) {
  try {
    const seasonData = await req.json()
    const parsedNewSeason = newSeason.parse(seasonData)
    const createdPlayer = await createSeason(parsedNewSeason)
    return NextResponse.json(createdPlayer)
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.errors },
        {
          status: 400,
        }
      )
    }

    return NextResponse.error()
  }
}
