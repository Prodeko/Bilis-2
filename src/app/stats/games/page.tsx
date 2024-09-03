import { mapLatestGameToFrontend } from "@common/utils/gameStats";
import type { GameTableSchema } from "@components/ui/MultifunctionTable/schemas";
import { getGameCount, getLatestGames } from "@server/db/games";

import { TableProvider } from "./TableProvider";

const StatsGamesPage = async () => {
  const data: GameTableSchema[] = (await getLatestGames(10)).map(
    mapLatestGameToFrontend,
  );
  const gameCount = await getGameCount();
  const pageCount = Math.ceil(gameCount / 10);

  return <TableProvider data={data} pageCount={pageCount} />;
};

export default StatsGamesPage;

export const dynamic = "force-dynamic";
