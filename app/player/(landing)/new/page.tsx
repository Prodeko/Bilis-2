import { NewProfileLayoutInner } from '@components/Player/PlayerLayout/Inner'
import BackButton from '@components/Player/BackButton'
import ProfileForm from 'app/components/NewProfile/ProfileForm'

const NewPlayerPage = async () => {
  return (
      <NewProfileLayoutInner>
        <BackButton route={`/player`} />
        <ProfileForm />
      </NewProfileLayoutInner>
  )
}

export default NewPlayerPage