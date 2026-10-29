import { NextResponse } from "next/server";

import { formatFullName } from "@common/utils/helperFunctions";
import { getLatestGames } from "@server/db/games";
import { getFormattedPlayers } from "@server/db/players/derivatives";
import { getCurrentSeason } from "@server/db/seasons";

// Read-only summary for the guild room infoscreen
// (github.com/Prodeko/infoscreen): the overall and current season's top
// players, and the latest games. Everything here is already public on the
// home page.

const TOP_COUNT = 10;
const RECENT_GAME_COUNT = 5;

type RankedPlayer = {
  id: number;
  name: string;
  emoji: string;
  elo: number;
};

const toRanked = (player: {
  id: number;
  firstName: string;
  lastName: string;
  emoji: string;
  elo: number | null;
}): RankedPlayer => ({
  id: player.id,
  name: `${player.firstName} ${player.lastName}`,
  emoji: player.emoji,
  elo: Math.round(player.elo ?? 0),
});

export async function GET() {
  const season = await getCurrentSeason();
  const [overall, seasonal, games] = await Promise.all([
    getFormattedPlayers(TOP_COUNT, false),
    season ? getFormattedPlayers(TOP_COUNT, true) : Promise.resolve([]),
    getLatestGames(RECENT_GAME_COUNT, 0, false),
  ]);

  return NextResponse.json({
    season: season
      ? {
          name: season.name,
          start: season.start.toISOString(),
          end: season.end.toISOString(),
        }
      : null,
    overall: overall.map(toRanked),
    seasonal: seasonal.map(toRanked),
    recentGames: games.flatMap((game) =>
      game.winner && game.loser
        ? [
            {
              id: game.id,
              winner: formatFullName(game.winner.toJSON(), true),
              loser: formatFullName(game.loser.toJSON(), true),
              underTable: game.underTable,
              eloChange: Math.round(game.winnerEloAfter - game.winnerEloBefore),
              playedAt: game.createdAt.toISOString(),
            },
          ]
        : [],
    ),
  });
}

export const dynamic = "force-dynamic";
