import PlayerForm from 'app/components/Player/PlayerForm'

import { Player } from '@common/types'
import BackButton from '@components/Player/BackButton'
import { PlayerLayoutInner } from '@components/Player/PlayerLayout/Inner'
import { getPlayerById } from '@server/db/players'

const editPlayer = async ({ params }: { params: { id: number } }) => {
  const id = Number(params.id)
  const player = (await getPlayerById(id)) as Player

  return (
    <PlayerLayoutInner>
      <BackButton route={`/player/${player.id}`} />
      <PlayerForm player={player} />
    </PlayerLayoutInner>
  )
}

export default editPlayer

export const dynamic = 'force-dynamic'
