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
  error: string
  statusCode: number
}
type Props = PlayerWithStatistics | ErrorType

const PlayerPage: NextPage<Props> = (props: Props) => {
  if ('error' in props) {
    return <ErrorPage title={props.error} statusCode={props.statusCode} />
  }

  const {
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
  } = props

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
  const profileData = await res.json()

  if (profileData.body?.error) {
    return {
      props: {
        error: profileData.body.error,
        statusCode: profileData.statusCode,
      },
    }
  }

  return {
    props: profileData,
  }
}

export default PlayerPage
