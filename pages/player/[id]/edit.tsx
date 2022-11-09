import axios from 'axios'
import { GetServerSideProps } from 'next'

import { Player } from '@common/types'
import NewProfileLayout from '@components/Layout/NewProfileLayout'
import BackButton from '@components/NewProfile/BackButton'
import ProfileForm from '@components/NewProfile/ProfileForm'
import { NEXT_PUBLIC_API_URL } from '@config/index'

const editPlayer = ({ player }: { player: Player }) => {
  return (
    <NewProfileLayout>
      <BackButton />
      <ProfileForm player={player} />
    </NewProfileLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const playerId = params?.id
  const res = await axios.get(`${NEXT_PUBLIC_API_URL}/player/${playerId}`)

  return { props: { player: res.data } }
}

export default editPlayer
