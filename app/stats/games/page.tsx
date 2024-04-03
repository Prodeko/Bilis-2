import type { GameTableSchema } from "@ui/MultifunctionTable/schemas";

import { elo } from "@common/types";
import {
  formatFullName,
  formatIsoStringToDate,
} from "@common/utils/helperFunctions";
import { getLatestGames } from "@server/db/games";
import type { GameModel } from "@server/models";

import { TableProvider } from "./TableProvider";

const StatsGamesPage = async () => {
  const gamesWithStats = (await getLatestGames(10_000_000)).map((game) =>
    game.toJSON(),
  ) as GameModel[];

  const data: GameTableSchema[] = gamesWithStats.map((game) => ({
    time: formatIsoStringToDate(game.createdAt),
    winner: game.winner
      ? formatFullName(game.winner, true, !!game.winner.nickname)
      : "Winner name not found",
    loser: game.loser
      ? formatFullName(game.loser, true, !!game.loser.nickname)
      : "Loser name not found",
    winnerFargoNow: elo.parse(Number(game.winnerEloAfter.toFixed(2))),
    winnerFargoDifference: game.winnerEloAfter - game.winnerEloBefore,
    loserFargoNow: elo.parse(Number(game.loserEloAfter.toFixed(2))),
    loserFargoDifference: game.loserEloAfter - game.loserEloBefore,
    underTable: game.underTable ? "💩" : " ",
  }));

  return <TableProvider data={data} />;
};

export default StatsGamesPage;

export const dynamic = "force-dynamic";
