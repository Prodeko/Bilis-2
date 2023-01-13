import { round } from 'lodash'
import type { GetServerSideProps, NextPage } from 'next'
import ErrorPage from 'next/error'

import type { Player, PlayerWithStats, TimeSeriesGame } from '@common/types'
import { isNumber } from '@common/types/guards'
import ProfileLayout from '@components/Layout/ProfileLayout'
import ProfileCharts from '@components/Profile/ProfileCharts'
import ProfileHeader from '@components/Profile/ProfileHeader'
import ProfileStats from '@components/Profile/ProfileStats/'
import { getPlayerDetailedGames } from '@server/db/games'
import { getPlayerStats } from '@server/db/games/derivatives'
import { getPlayerById } from '@server/db/players'

type ErrorType = {
  error: string
  statusCode: number
}

type GameData = {
  gameData: TimeSeriesGame[]
}

type Props = (PlayerWithStats & GameData) | ErrorType

const PlayerPage: NextPage<Props> = (props: Props) => {
  if ('error' in props) {
    return <ErrorPage title={props.error} statusCode={props.statusCode} />
  }

  const {
    id,
    firstName,
    lastName,
    nickname,
    emoji,
    motto,
    elo,
    totalGames,
    wonGames,
    lostGames,
    winPercentage,
    gameData,
  } = props
  const player: Player = { id, firstName, lastName, nickname, emoji, motto, elo }

  return (
    <ProfileLayout>
      <ProfileHeader player={player} />
      <ProfileStats
        stats={[
          { label: 'Fargo', value: round(elo, 2).toFixed(2) },
          { label: 'Total Games', value: totalGames.toString() },
          { label: 'Wins / Losses', value: `${wonGames} / ${lostGames}` },
          { label: 'Win Percentage', value: `${round(winPercentage, 2).toFixed(2)}%` },
        ]}
      />
      <ProfileCharts gameData={gameData} currentPlayerId={id} />
    </ProfileLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  // Check for valid number
  const id = Number(context.query.id) as unknown
  if (!isNumber(id)) {
    return {
      props: {
        error: 'ID must be type of number',
        statusCode: 400,
      },
    }
  }

  const [player, playerStats, playerDetailedGames] = await Promise.all([
    getPlayerById(id),
    getPlayerStats(id),
    getPlayerDetailedGames(id),
  ])

  // Check that no data in undefined
  if (!player || !playerStats || !playerDetailedGames) {
    return {
      props: {
        error: `No game data found with ID ${id}`,
        statusCode: 404,
      },
    }
  }

  const playerWithStats: PlayerWithStats = {
    ...player.toJSON(),
    ...playerStats,
  }

  return {
    props: { ...playerWithStats, gameData: playerDetailedGames },
  }
}

export default PlayerPage
