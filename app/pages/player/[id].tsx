import ProfileLayout from '@components/Layouts/ProfileLayout'
import ProfileStats from '@components/Profile/ProfileStats/'
import ProfileHeader from '@components/Profile/ProfileHeader'
import type { GetServerSideProps, NextPage } from 'next'
import axios from 'axios'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import { Player } from '@common/types'
import { round } from 'lodash'

const PlayerPage: NextPage<Player> = ({
  id,
  firstName,
  lastName,
  nickname,
  elo,
  emoji,
}: Player) => {
  return (
    <ProfileLayout>
      <ProfileHeader
        emoji={emoji}
        nickname={nickname}
        id={id}
        firstName={firstName}
        lastName={lastName}
      />
      <ProfileStats
        stats={[
          { label: 'Elo', value: round(elo).toString() },
          { label: 'Won games', value: (284).toString() },
          { label: 'Lost games', value: (493).toString() },
          { label: 'Win percentage', value: '87%' },
        ]}
      />
    </ProfileLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const res = await axios.get(`${NEXT_PUBLIC_API_URL}/player/${context.query.id}`)
  const profileData = res.data

  return {
    props: { ...profileData },
  }
}

export default PlayerPage
