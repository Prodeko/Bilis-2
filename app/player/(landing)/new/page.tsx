import { NewProfileLayoutInner } from 'app/components/Layout/NewProfileLayout/Inner'
import BackButton from 'app/components/NewProfile/BackButton'
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