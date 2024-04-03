import type { Dispatch, SetStateAction } from "react";

import type { AddedGameResponse, RecentGame } from "@common/types";
import useSeasonalMode from "@hooks/useSeasonalMode";
import {
  addToRecentPlayers,
  setPlayerId,
  setUndertable,
  useModalState,
} from "@state/Modal";
import { removeFromQueue, useQueueState } from "@state/Queue";

interface Props {
  setGames: Dispatch<SetStateAction<RecentGame[]>>;
  onClose: () => void;
}

export const GameCreation = ({ setGames, onClose }: Props) => {
  const { seasonal } = useSeasonalMode();
  const [{ game, refs }, dispatchModal] = useModalState();
  const [_, dispatchQueue] = useQueueState();

  const isActive = Boolean(game.winnerId && game.loserId);
  const onSubmit = async () => {
    if (game.winnerId === game.loserId) {
      console.warn("Winner and loser cannot be same");
      return;
    }

    const res = await fetch("/api/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });
    const data = (await res.json()) as unknown as AddedGameResponse;
    dispatchModal(
      addToRecentPlayers([
        {
          ...data.loser,
          elo: seasonal ? data.loser.seasonElo ?? 400 : data.loser.elo,
        },
        {
          ...data.winner,
          elo: seasonal ? data.loser.seasonElo ?? 400 : data.loser.elo,
        },
      ]),
    );
    dispatchModal(setPlayerId("winner", undefined));
    dispatchModal(setPlayerId("loser", undefined));
    if (game.winnerId) dispatchQueue(removeFromQueue(game.winnerId));
    if (game.loserId) dispatchQueue(removeFromQueue(game.loserId));
    setGames((prev: RecentGame[]) => [data.recentGame as RecentGame, ...prev]);
    onClose();
    document?.getElementById("home-layout")?.focus(); // focus on the root element so pressing enter adds a new game
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <button
        className="h-16 w-1/2 cursor-pointer rounded-lg border-none bg-primary-600 text-2xl font-semibold text-white transition-all duration-200 hover:bg-primary-700 active:bg-primary-800 disabled:cursor-not-allowed disabled:bg-primary-200"
        disabled={!isActive}
        onClick={onSubmit}
        type="button"
        ref={refs?.addGame}
      >
        Add Game
      </button>
      <div className="flex gap-4">
        <input
          className="h-8 w-8 cursor-pointer"
          id="checkbox"
          type="checkbox"
          onChange={(v) => dispatchModal(setUndertable(v.target.checked))}
        />
        <label
          className="cursor-pointer text-2xl font-semibold text-white"
          htmlFor="checkbox"
        >
          Undertable
        </label>
      </div>
    </div>
  );
};
