import { round } from "lodash";
import { memo } from "react";
import GaugeChart from "react-gauge-chart";

import type { Player } from "@common/types";
import useSeasonalMode from "@hooks/useSeasonalMode";

// API: https://github.com/Martin36/react-gauge-chart

export const EloMeter = memo(({ player }: { player: Player }) => {
  const { seasonal } = useSeasonalMode();
  const elo = seasonal ? player.seasonElo ?? 400 : player.elo;
  const MIN_ELO = 0;
  const MAX_ELO = 800;
  const pointerPosition = elo / MAX_ELO;

  return (
    <div className="relative max-w-full">
      <GaugeChart
        animateDuration={1000}
        animDelay={100}
        colors={["#CC0000", "#00BB00"]} // Flip red and green colors
        cornerRadius={1}
        hideText={true}
        id={`gauge-chart-${player.id}`}
        needleColor={"#ddd"}
        nrOfLevels={20}
        percent={pointerPosition}
      />
      <span className="absolute -bottom-[-10%] left-1/2 -translate-x-1/2 text-3xl font-semibold text-neutral-50">
        {round(elo, 2)}
      </span>
      <span className="absolute bottom-10 right-[95%] text-neutral-50">
        {MIN_ELO}
      </span>
      <span className="absolute bottom-10 left-[95%] text-neutral-50">
        {MAX_ELO}
      </span>
    </div>
  );
});
