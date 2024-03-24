import type { Dispatch, SetStateAction } from "react";

import type { RecentGame } from "@common/types";
import { useModalState } from "@state/Modal";

import styles from "./Content.module.scss";
import GameCreation from "./GameCreation";
import PlayerSelection from "./PlayerSelection";
import Title from "./Title";

type Props = {
  onClose: () => void;
  setGames: Dispatch<SetStateAction<RecentGame[]>>;
};

const Content = ({ onClose, setGames }: Props) => {
  const [{ game }] = useModalState();

  return (
    <div className={styles.cardWrapper}>
      <Title title="New Game" />
      <div className={styles.card}>
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
