import { cva } from "class-variance-authority";

import type { TimeSeriesGame } from "@common/types";

interface Props {
  game?: TimeSeriesGame;
}

const colorStyles = cva("font-medium", {
  variants: {
    positive: {
      true: "text-success-500",
      false: "text-danger-500",
    },
  },
});

export const Tooltip = ({ game }: Props) => {
  if (!game) {
    return (
      <div className="relative flex flex-col gap-1 bg-neutral-800 p-2 text-lg">
        No data found
      </div>
    );
  }

  const eloDiff = game.eloDiff;

  return (
    <div className="relative flex flex-col gap-1 bg-neutral-800 p-2 text-lg">
      <div className="flex justify-between gap-4">
        <span className="font-bold">Fargo: </span>
        <span className="font-medium">{game.currentElo.toFixed(2)}</span>
      </div>
      <div className="flex justify-between gap-4">
        <span className="font-bold">Opponent: </span>
        <span className="font-medium">{game.opponent}</span>
      </div>
      <div className="flex justify-between gap-4">
        <span className="font-bold">Fargo Change: </span>
        <span className={colorStyles({ positive: eloDiff >= 0 })}>
          {/* Add plus if positve */}
          {eloDiff >= 0 && "+"}
          {eloDiff.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
