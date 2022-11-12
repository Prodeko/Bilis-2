import type { GetServerSideProps, NextPage } from 'next'
import ErrorPage from 'next/error'
import { round } from 'lodash'

import type { Player, PlayerStats } from '@common/types'
import ProfileLayout from '@components/Layout/ProfileLayout'
import ProfileCharts from '@components/Profile/ProfileCharts'
import ProfileHeader from '@components/Profile/ProfileHeader'
import ProfileStats from '@components/Profile/ProfileStats/'
import { NEXT_PUBLIC_API_URL } from '@config/index'

type PlayerProps = {
  player: Player
  playerStats: PlayerStats
}

type ErrorType = {
  error: string
  statusCode: number
}
type Props = PlayerProps | ErrorType

const PlayerPage: NextPage<Props> = (props: Props) => {
  if ('error' in props) {
    return <ErrorPage title={props.error} statusCode={props.statusCode} />
  }

  const { player, playerStats } = props
  const { id, elo } = player
  const { totalGames, wonGames, lostGames, winPercentage, eloData } = playerStats

  return (
    <ProfileLayout>
      <ProfileHeader player={player} />
      <ProfileStats
        stats={[
          { label: 'Elo', value: round(elo, 2).toFixed(2) },
          { label: 'Total Games', value: totalGames.toString() },
          { label: 'Wins / Losses', value: `${wonGames} / ${lostGames}` },
          { label: 'Win Percentage', value: `${round(winPercentage, 2).toFixed(2)}%` },
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
