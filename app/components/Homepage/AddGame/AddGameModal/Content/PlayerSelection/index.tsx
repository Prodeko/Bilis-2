import { cva } from "class-variance-authority";
import { useEffect, useState } from "react";

import { type PlayerWithStats, playerWithStats } from "@common/types";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { Side } from "@state/Modal";

import ChoosePlayer from "./ChoosePlayer";
import SelectedPlayer from "./SelectedPlayer";

interface Props {
  playerId: number | undefined;
  otherPlayerId: number | undefined;
  side: Side;
}

const titleStyles = cva("h-[10%] text-center text-5xl font-bold capitalize", {
  variants: {
    isWinner: {
      true: "text-success-500",
      false: "text-danger-500",
    },
  },
});

export const PlayerSelection = ({ playerId, otherPlayerId, side }: Props) => {
  const [parent, _enableAnimations] = useAutoAnimate<HTMLDivElement>({
    duration: 500,
  });
  const [player, setPlayer] = useState<PlayerWithStats | null>(null);

  useEffect(() => {
    const fetchAndSetPlayer = async () => {
      const res = await fetch(`api/player/${playerId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const player = await res.json();
      const parsedPlayerWithStats = playerWithStats.parse(player);
      setPlayer(parsedPlayerWithStats);
    };
    if (playerId) fetchAndSetPlayer();
  }, [playerId]);

  return (
    <div
      ref={parent}
      className="flex max-h-full min-h-0 w-full flex-col justify-center gap-y-12"
    >
      <h2 className={titleStyles({ isWinner: side === "winner" })}>{side}</h2>
      {playerId && player ? (
        <SelectedPlayer player={player} side={side} />
      ) : (
        <ChoosePlayer filterId={otherPlayerId} side={side} />
      )}
    </div>
  );
};
