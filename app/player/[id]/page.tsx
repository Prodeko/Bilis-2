import type { Player } from '@common/types'
import ProfileCharts from '@components/Profile/ProfileCharts'
import ProfileLayout from '@components/Profile/ProfileLayout/'
import ProfileStats from '@components/Profile/ProfileStats'
import { ProfileHeader } from '@components/ui/Header/Profile'
import { getPlayerDetailedGames } from '@server/db/games/derivatives'
import { getPlayerStats } from '@server/db/games/derivatives'
import { getPlayerById } from '@server/db/players'

const PlayerPage = async ({ params }: { params: { id: number } }) => {
  const id = Number(params.id)

  const [player, playerStats, gameData] = await Promise.all([
    getPlayerById(id).then(player => player?.toJSON()) as Promise<Player>,
    getPlayerStats(id),
    getPlayerDetailedGames(id),
  ])

  return (
    <ProfileLayout>
      <ProfileHeader player={player} />
      <ProfileStats player={player} playerStats={playerStats} gameData={gameData} />
      <ProfileCharts gameData={gameData} currentPlayerId={id} />
    </ProfileLayout>
  )
}

export default PlayerPage
