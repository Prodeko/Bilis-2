import { headers } from 'next/headers'

import type { Player } from '@common/types'
import ProfileCharts from '@components/Profile/ProfileCharts'
import ProfileLayout from '@components/Profile/ProfileLayout/'
import ProfileStats from '@components/Profile/ProfileStats'
import { ProfileHeader } from '@components/ui/Header/Profile'
import { getPlayerDetailedGames } from '@server/db/games/derivatives'
import { getPlayerStats } from '@server/db/games/derivatives'
import { getPlayerById } from '@server/db/players'

const PlayerPage = async () => {
  const headersList = headers()
  const header_url = headersList.get('x-url') || ''
  const url_array = header_url.split('/')
  const id_string = url_array[url_array.length - 1]
  const id = Number(id_string)

  const [player, playerStats, gameData] = await Promise.all([
    getPlayerById(id).then(player => player?.toJSON()) as Promise<Player>,
    getPlayerStats(id),
    getPlayerDetailedGames(id),
  ])

  return (
    <ProfileLayout>
      <ProfileHeader player={player} />
      <ProfileStats player={player} playerStats={playerStats} />
      <ProfileCharts gameData={gameData} currentPlayerId={id} />
    </ProfileLayout>
  )
}

export default PlayerPage
