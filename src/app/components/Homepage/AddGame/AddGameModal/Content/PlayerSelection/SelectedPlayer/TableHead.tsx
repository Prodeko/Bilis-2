import { HiPencil } from "react-icons/hi";

import type { PlayerWithStats } from "@common/types";
import { type Side, setFocus, setPlayerId, useModalState } from "@state/Modal";

interface Props {
  player: PlayerWithStats;
  side: Side;
}

export const TableHead = ({ player, side }: Props) => {
  const [_, dispatch] = useModalState();

  const onClear = async () => {
    dispatch(setPlayerId(side, undefined));
    dispatch(setFocus(side));
  };
  return (
    <div className="flex items-center justify-between gap-2 text-4xl font-bold text-neutral-200">
      <div>
        {player.firstName} {player.lastName}
      </div>
      <button
        className="flex cursor-pointer items-center justify-center rounded-[50%] border-none bg-neutral-300 p-3 text-primary-800 transition-all duration-300 hover:bg-neutral-50"
        onClick={onClear}
        type="button"
      >
        <HiPencil size={24} />
      </button>
    </div>
  );
};
