import ProfileCharts from '@components/Profile/ProfileCharts'
import ProfileStats from '@components/Profile/ProfileStats'
import { ProfileHeader } from '@components/ui/Header/Profile'
import { round } from 'lodash'
import { headers } from 'next/headers';

import type { Player } from '@common/types'
import { getPlayerDetailedGames } from '@server/db/games/derivatives'
import { getPlayerStats } from '@server/db/games/derivatives'
import { getPlayerById } from '@server/db/players'
import ProfileLayout from '@components/Profile/ProfileLayout/';


const PlayerPage = async () => {
  const headersList = headers();
  const header_url = headersList.get('x-url') || "";
  const url_array = header_url.split("/")
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
      <ProfileStats
        stats={[
          { label: 'Fargo', value: round(player.elo, 2).toFixed(2) },
          { label: 'Total Games', value: playerStats.totalGames.toString() },
          { label: 'Wins / Losses', value: `${playerStats.wonGames} / ${playerStats.lostGames}` },
          { label: 'Win Percentage', value: `${round(playerStats.winPercentage, 2).toFixed(2)}%` },
        ]}
        />
      <ProfileCharts gameData={gameData} currentPlayerId={id} />
    </ProfileLayout>
  )
}

export default PlayerPage
