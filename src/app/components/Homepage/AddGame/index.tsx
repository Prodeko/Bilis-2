import type { Dispatch, SetStateAction } from "react";

import type { Player, RecentGame } from "@common/types";
import { AddGameModal } from "@components/Homepage/AddGame/AddGameModal";

type Props = {
  onOpen: () => void;
  onClose: () => void;
  setGames: Dispatch<SetStateAction<RecentGame[]>>;
  open: boolean;
  recentPlayers: Player[];
};

export const AddGameButton = (props: Props) => {
  const { open, onOpen, ...modalProps } = props;
  const inlineStyles = {
    gridColumn: "3 / 3",
    gridRow: "1 / 2",
  };

  return (
    <>
      <button
        className="relative z-0 flex h-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-handshake bg-cover bg-center text-center text-neutral-400 transition-all duration-300 after:absolute after:h-full after:w-full after:bg-neutral-900 after:bg-opacity-80 after:transition-all after:duration-300 hover:text-neutral-200 hover:after:bg-opacity-75"
        style={inlineStyles}
        onClick={onOpen}
        type="button"
        id={"button"}
      >
        <span className="z-10 text-4xl font-semibold">Add New Game</span>
      </button>
      {open && <AddGameModal {...modalProps} />}
    </>
  );
};
