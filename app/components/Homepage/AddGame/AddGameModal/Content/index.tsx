import type { Dispatch, SetStateAction } from "react";

import type { RecentGame } from "@common/types";
import { useModalState } from "@state/Modal";

import { GameCreation } from "./GameCreation";
import { PlayerSelection } from "./PlayerSelection";

type Props = {
  onClose: () => void;
  setGames: Dispatch<SetStateAction<RecentGame[]>>;
};

const Content = ({ onClose, setGames }: Props) => {
  const [{ game }] = useModalState();

  return (
    <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0_,1fr)]">
      <h2 className="bg-primary-800 p-16 text-center text-5xl font-bold capitalize text-neutral-200">
        New Game
      </h2>
      <div className="grid h-full min-h-0 grid-cols-3 gap-x-8 p-8">
        <PlayerSelection
          playerId={game.winnerId}
          otherPlayerId={game.loserId}
          side={"winner"}
        />
        <GameCreation setGames={setGames} onClose={onClose} />
        <PlayerSelection
          playerId={game.loserId}
          otherPlayerId={game.winnerId}
          side={"loser"}
        />
      </div>
    </div>
  );
};

export default Content;
