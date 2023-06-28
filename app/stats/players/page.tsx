import { elo, id } from '@common/types'
import { getPlayersWithStats } from '@server/db/players/tableQueries'
import { PlayerTableSchema } from '@ui/MultifunctionTable/schemas'

import { TableProvider } from './TableProvider'

const StatsPlayersPage = async () => {
  const playersWithStats = await getPlayersWithStats()
  const data: PlayerTableSchema[] = playersWithStats.map((player, idx) => ({
    position: id.parse(idx + 1),
    fullName: `${player.emoji} ${player.first_name} ${player.last_name}`,
    fargo: elo.parse(Number(player.elo.toFixed(2))),
    gameCount: id.parse(Number(player.game_count)),
    winCount: id.parse(Number(player.win_count)),
    winPercentage: `${((player.win_count * 100) / player.game_count).toFixed(1)}%`,
  }))

  return <TableProvider data={data} />
}

export default StatsPlayersPage
