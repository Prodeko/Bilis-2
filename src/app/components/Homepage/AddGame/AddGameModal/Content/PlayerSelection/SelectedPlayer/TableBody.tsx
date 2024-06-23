import { round } from "lodash";

import type { PlayerWithStats } from "@common/types";

export const TableBody = ({ player }: { player: PlayerWithStats }) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full justify-between text-left text-3xl">
        <span className="font-medium text-primary-200">Games</span>
        <span className="font-semibold text-primary-50">
          {player.totalGames}
        </span>
      </div>
      <div className="flex w-full justify-between text-left text-3xl">
        <span className="font-medium text-primary-200">Wins</span>
        <span className="font-semibold text-primary-50">{player.wonGames}</span>
      </div>
      <div className="flex w-full justify-between text-left text-3xl">
        <span className="font-medium text-primary-200">Win percentage</span>
        <span className="font-semibold text-primary-50">
          {round(player.winPercentage, 2)}%
        </span>
      </div>
    </div>
  );
};
