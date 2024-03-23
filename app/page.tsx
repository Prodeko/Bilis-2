import {
  NOF_LATEST_PLAYERS,
  NOF_LEADERBOARD_PLAYERS,
} from "@common/utils/constants";
import { Header } from "@components/ui/Header/Main";
import { getRecentGames } from "@server/db/games/derivatives";
import { getLatestPlayers } from "@server/db/players";
import { getFormattedPlayers } from "@server/db/players/derivatives";

import HomeLayout from "./HomeLayout";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const seasonal = searchParams?.seasonal === "true";
  const [leaderboard, recentPlayers, recentGames] = await Promise.all([
    getFormattedPlayers(NOF_LEADERBOARD_PLAYERS, seasonal),
    getLatestPlayers(NOF_LATEST_PLAYERS, seasonal),
    getRecentGames(100, seasonal),
  ]);

  return (
    <div
      tabIndex={-1}
      className="grid h-screen grid-rows-[auto_minmax(0,_1fr)]"
    >
      <Header seasonal={seasonal} />
      <HomeLayout
        leaderboard={leaderboard}
        recentPlayers={recentPlayers}
        recentGames={recentGames}
      />
    </div>
  );
}

export const dynamic = "force-dynamic";
