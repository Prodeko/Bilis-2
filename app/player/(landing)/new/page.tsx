import { PlayerLayoutInner } from '@components/Player/PlayerLayout/Inner'
import BackButton from '@components/Player/BackButton'
import PlayerForm from 'app/components/Player/PlayerForm'

const NewPlayerPage = async () => {
  return (
      <PlayerLayoutInner>
        <BackButton route={`/player`} />
        <PlayerForm />
      </PlayerLayoutInner>
  )
}

export default NewPlayerPage