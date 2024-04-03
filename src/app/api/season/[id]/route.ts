import { NextRequest, NextResponse } from 'next/server'

import { id as idParser, newSeason } from '@common/types'
import { deleteSeason, updateSeason } from '@server/db/seasons'

export async function DELETE(_req: NextRequest, { params }: { params: { id: number } }) {
  const id = idParser.parse(Number(params.id))
  try {
    const deletedSeason = await deleteSeason(id)
    return NextResponse.json(deletedSeason)
  } catch (error) {
    return NextResponse.error()
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: number } }) {
  const id = idParser.parse(Number(params.id))
  const data = newSeason.parse(await req.json())
  try {
    const updatedSeason = await updateSeason(id, data)
    return NextResponse.json(updatedSeason)
  } catch (error) {
    return NextResponse.error()
  }
}

export const dynamic = 'force-dynamic'
