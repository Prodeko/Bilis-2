import { NewProfileLayoutInner } from '@components/Layout/NewProfileLayout/Inner'
import { NewProfileLayoutOuter } from '@components/Layout/NewProfileLayout/Outer'
import BackButton from '@components/NewProfile/BackButton'
import ProfileForm from '@components/NewProfile/ProfileForm'
import Header from '@components/ui/Header/Player'

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
