import { PlayerLayoutInner } from '@components/Player/PlayerLayout/Inner'
import BackButton from '@components/Player/BackButton'
import PlayerForm from 'app/components/Player/PlayerForm'

import { Player } from '@common/types'
import { getPlayerById } from '@server/db/players'
import { headers } from 'next/headers'

const editPlayer = async () => {
  const headersList = headers();
  const header_url = headersList.get('x-url') || "";
  const url_array = header_url.split("/")
  const id_string = url_array[url_array.length - 2] // Minus two because we have the edit appended
  const id = Number(id_string)
  const player = await getPlayerById(id) as Player

  return (
    <PlayerLayoutInner>
      <BackButton route={`/player/${player.id}`} />
      <PlayerForm player={player} />
    </PlayerLayoutInner>
  )
}

export default editPlayer
