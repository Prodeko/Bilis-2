"use client";

import { useState } from "react";

import type { PieChartProps } from "@common/types";
import { PieChart } from "@components/ui/PieChart";
import { PlayerSearchSelect } from "@components/ui/PlayerSearch/PlayerSearchSelect";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const PlayerComparison = ({
  currentPlayerId,
}: {
  currentPlayerId: number;
}) => {
  const [pieChartProps, setPieChartProps] = useState<PieChartProps | undefined>(
    undefined,
  );
  const [parent, _enableAnimations] = useAutoAnimate<HTMLDivElement>({
    duration: 400,
  });

  return (
    <div ref={parent} className="grid grid-rows-[auto_minmax(0,_1fr)] gap-y-6">
      <PlayerSearchSelect
        currentPlayerId={currentPlayerId}
        setPieChartProps={setPieChartProps}
      />
      {pieChartProps && <PieChart {...pieChartProps} />}
    </div>
  );
};
