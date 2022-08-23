import ProfileLayout from '@components/Layouts/ProfileLayout'
import ProfileStats from '@components/Profile/ProfileStats/'
import ProfileHeader from '@components/Profile/ProfileHeader'
import type { GetServerSideProps, NextPage } from 'next'
import axios from 'axios'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import { PlayerWithStatistics } from '@common/types'
import { round } from 'lodash'

const PlayerPage: NextPage<PlayerWithStatistics> = ({
  id,
  firstName,
  lastName,
  nickname,
  elo,
  emoji,
  wonGames,
  totalGames,
  winPercentage,
}: PlayerWithStatistics) => {
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
          { label: 'Won games', value: wonGames.toString() },
          { label: 'Total games', value: totalGames.toString() },
          { label: 'Win percentage', value: winPercentage },
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
