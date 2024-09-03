import type { PlayerWithStats } from "@common/types";
import { EloMeter } from "@components/Homepage/AddGame/AddGameModal/Content/PlayerSelection/SelectedPlayer/EloMeter";
import { TableBody } from "@components/Homepage/AddGame/AddGameModal/Content/PlayerSelection/SelectedPlayer/TableBody";
import { TableHead } from "@components/Homepage/AddGame/AddGameModal/Content/PlayerSelection/SelectedPlayer/TableHead";
import type { Side } from "@state/Modal";

type Props = {
  player: PlayerWithStats;
  side: Side;
};

export const SelectedPlayer = ({ player, side }: Props) => {
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
