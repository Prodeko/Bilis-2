import NewProfileLayout from '@components/Layout/ProfileLayout/newProfileLayout'
import BackButton from '@components/NewProfile/BackButton'
import NewProfileForm from '@components/NewProfile/NewProfileForm'

const newPlayer = () => {
  return (
    <NewProfileLayout>
      <BackButton />
      <NewProfileForm />
    </NewProfileLayout>
  )
}

export default newPlayer
