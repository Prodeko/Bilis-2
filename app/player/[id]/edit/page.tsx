import { NewProfileLayoutInner } from 'app/components/Layout/NewProfileLayout/Inner'
import { NewProfileLayoutOuter } from 'app/components/Layout/NewProfileLayout/Outer'
import BackButton from 'app/components/NewProfile/BackButton'
import ProfileForm from 'app/components/NewProfile/ProfileForm'
import Header from 'app/components/ui/Header/Player'

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
    <NewProfileLayoutOuter>
      <Header />
      <NewProfileLayoutInner>
        <BackButton route={`/player/${player.id}`} />
        <ProfileForm player={player} />
      </NewProfileLayoutInner>
    </NewProfileLayoutOuter>
  )
}

export default editPlayer
