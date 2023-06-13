import { NewProfileLayoutInner } from 'app/components/Layout/NewProfileLayout/Inner'
import { NewProfileLayoutOuter } from 'app/components/Layout/NewProfileLayout/Outer'
import BackButton from 'app/components/NewProfile/BackButton'
import ProfileForm from 'app/components/NewProfile/ProfileForm'
import Header from 'app/components/ui/Header/Player'

const newPlayer = () => {
  return (
    <NewProfileLayoutOuter>
      <Header />
      <NewProfileLayoutInner>
        <BackButton route={`/player`} />
        <ProfileForm />
      </NewProfileLayoutInner>
    </NewProfileLayoutOuter>
  )
}

export default newPlayer
