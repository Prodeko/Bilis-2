import PlayerForm from 'app/components/Player/PlayerForm'

import BackButton from '@components/Player/BackButton'
import { PlayerLayoutInner } from '@components/Player/PlayerLayout/Inner'

const NewPlayerPage = async () => {
  return (
    <PlayerLayoutInner>
      <BackButton route={`/player`} />
      <PlayerForm />
    </PlayerLayoutInner>
  )
}

export default NewPlayerPage
