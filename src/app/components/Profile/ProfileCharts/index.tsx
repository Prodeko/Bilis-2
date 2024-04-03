import type { ComponentProps } from "react";

import TimeSeriesChart from "@ui/TimeSeriesChart/TimeSeriesChart";

import { getPlayerDetailedGames } from "@server/db/games/derivatives";

import PlayerComparison from "./PlayerComparison";

type DivProps = ComponentProps<"div">;

interface Props extends DivProps {
  playerId: number;
}

const ProfileCharts = async ({ playerId, ...props }: Props) => {
  const gameData = await getPlayerDetailedGames(playerId);
  return (
    <div {...props} className="grid max-h-full grid-cols-2 gap-y-16 p-16">
      <div className="grid max-h-full grid-rows-[auto_minmax(0_,1fr)] gap-y-4 text-neutral-50">
        <h2 className="text-3xl font-medium text-neutral-100">Fargo Graph</h2>
        <TimeSeriesChart
          gameData={gameData}
          dataName="Fargo Data"
          chartTitle="All Time Fargo"
          height="100%"
        />
      </div>
      <div className="grid max-h-full grid-rows-[auto_minmax(0_,1fr)] gap-y-4 text-neutral-50">
        <h2 className="text-3xl font-medium text-neutral-100">
          Player Comparison
        </h2>
        <PlayerComparison currentPlayerId={playerId} />
      </div>
    </div>
  );
};

export default ProfileCharts;
