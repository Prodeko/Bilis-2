import { elo, id } from '@common/types'
import { formatFullName, formatIsoStringToDate } from '@common/utils/helperFunctions'
import { getLatestGames } from '@server/db/games'
import { GameTableSchema } from '@ui/MultifunctionTable/schemas'

import { TableProvider } from './TableProvider'

const StatsGamesPage = async () => {
  const gamesWithStats = (await getLatestGames(undefined)).map(game => game.toJSON())
  const data: GameTableSchema[] = gamesWithStats.map((game, idx) => ({
    time: formatIsoStringToDate(game.createdAt),
    winner: formatFullName(game.winner, true, false),
    loser: formatFullName(game.loser, true, false),
    winnerFargoNow: elo.parse(Number(game.winnerEloAfter.toFixed(2))),
    winnerFargoDifference: game.winnerEloAfter - game.winnerEloBefore,
    loserFargoNow: elo.parse(Number(game.loserEloAfter.toFixed(2))),
    loserFargoDifference: game.loserEloAfter - game.loserEloBefore,
    underTable: game.underTable ? '💩' : ' ',
  }))

  return <TableProvider data={data} />
}

export default StatsGamesPage
