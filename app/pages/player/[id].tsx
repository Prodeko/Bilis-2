import ProfileLayout from '@components/Layout/ProfileLayout'
import ProfileStats from '@components/Profile/ProfileStats/'
import ProfileHeader from '@components/Profile/ProfileHeader'
import ProfileCharts from '@components/Profile/ProfileCharts'
import type { GetServerSideProps, NextPage } from 'next'
import axios from 'axios'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import { Player, PlayerStats } from '@common/types'
import { round } from 'lodash'

type PlayerWithStatistics = Player & PlayerStats

const PlayerPage: NextPage<PlayerWithStatistics> = ({
  id,
  firstName,
  lastName,
  nickname,
  elo,
  emoji,
  lostGames,
  wonGames,
  totalGames,
  winPercentage,
  eloData,
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
          { label: 'Total Games', value: totalGames.toString() },
          { label: 'Wins / Losses', value: `${wonGames} / ${lostGames}` },
          { label: 'Win Percentage', value: `${winPercentage}%` },
        ]}
      />
      <ProfileCharts eloData={eloData} />
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
