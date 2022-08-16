import ProfileLayout from '@components/Layouts/ProfileLayout'
import ProfileStats from '@components/Profile/ProfileStats/'
import ProfileHeader from '@components/Profile/ProfileHeader'
import type { NextPage } from 'next'

const PlayerPage: NextPage = () => {
  return (
    <ProfileLayout>
      <ProfileHeader />
      <ProfileStats />
    </ProfileLayout>
  )
}

export default PlayerPage
