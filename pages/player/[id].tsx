import type { GetServerSideProps, NextPage } from 'next'
import ErrorPage from 'next/error'

import { Player, PlayerStats } from '@common/types'
import ProfileLayout from '@components/Layout/ProfileLayout'
import ProfileCharts from '@components/Profile/ProfileCharts'
import ProfileHeader from '@components/Profile/ProfileHeader'
import ProfileStats from '@components/Profile/ProfileStats/'
import { NEXT_PUBLIC_API_URL } from '@config/index'

type PlayerWithStatistics = Player & PlayerStats
type ErrorType = {
  errorCode: false | number
}
type Props = PlayerWithStatistics & ErrorType

const PlayerPage: NextPage<Props> = ({
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
  motto,
  errorCode,
}: Props) => {
  if (errorCode) {
    if (errorCode === 400) {
      return <ErrorPage title={`Player ID must be a number`} statusCode={errorCode} />
    } else if (errorCode === 404) {
      return <ErrorPage title={`Player with ID ${id} not found`} statusCode={errorCode} />
    } else {
      return <ErrorPage title={`Unexpected error occurred`} statusCode={errorCode} />
    }
  }

  return (
    <ProfileLayout>
      <ProfileHeader
        emoji={emoji}
        nickname={nickname}
        id={id}
        firstName={firstName}
        lastName={lastName}
        motto={motto}
      />
      <ProfileStats
        stats={[
          { label: 'Elo', value: elo.toString() },
          { label: 'Total Games', value: totalGames.toString() },
          { label: 'Wins / Losses', value: `${wonGames} / ${lostGames}` },
          { label: 'Win Percentage', value: `${winPercentage}%` },
        ]}
      />
      <ProfileCharts eloData={eloData} currentPlayerId={id} />
    </ProfileLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/player/${context.query.id}`)
  const errorCode = res.status === 200 ? false : res.status
  const profileData = (await res.json()) as PlayerWithStatistics

  return {
    props: { ...profileData, errorCode, id: context.query.id },
  }
}

export default PlayerPage
