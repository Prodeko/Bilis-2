import NewProfileLayout from '@components/Layout/NewProfileLayout'
import BackButton from '@components/NewProfile/BackButton'
import ProfileForm from '@components/NewProfile/ProfileForm'

const newPlayer = () => {
  return (
    <NewProfileLayout>
      <BackButton />
      <ProfileForm />
    </NewProfileLayout>
  )
}

export default newPlayer
