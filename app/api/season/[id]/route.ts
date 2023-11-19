import { NextRequest, NextResponse } from 'next/server'

import { id as idParser } from '@common/types'
import { deleteSeason } from '@server/db/seasons'

export async function DELETE(_req: NextRequest, { params }: { params: { id: number } }) {
  const id = idParser.parse(Number(params.id))
  try {
    const deletedSeason = await deleteSeason(id)
    return NextResponse.json(deletedSeason)
  } catch (error) {
    return NextResponse.error()
  }
}
