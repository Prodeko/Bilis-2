import type { PlayerWithStats } from "@common/types";
import type { Side } from "@state/Modal";

import { EloMeter } from "./EloMeter";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

type Props = {
  player: PlayerWithStats;
  side: Side;
};

const SelectedPlayer = ({ player, side }: Props) => {
  return (
    <div className="max-h-full">
      <div className="flex min-w-0 flex-col gap-10">
        <TableHead player={player} side={side} />
        <EloMeter player={player} />
        <TableBody player={player} />
      </div>
    </div>
  );
};

export default SelectedPlayer;
