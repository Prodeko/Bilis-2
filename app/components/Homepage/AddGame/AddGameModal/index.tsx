import type { Dispatch, SetStateAction } from "react";

import { ModalBlur } from "@ui/ModalBlur";

import type { RecentGame } from "@common/types";

import CloseButton from "./CloseButton";
import Content from "./Content";

type PlayerProps = {
  onClose: () => void;
  setGames: Dispatch<SetStateAction<RecentGame[]>>;
};

const AddGame = ({ onClose, setGames }: PlayerProps) => {
  return (
    <ModalBlur>
      <div className="relative h-4/5 min-h-0 w-4/5 rounded-2xl bg-neutral-800">
        <CloseButton onClose={onClose} />
        <Content setGames={setGames} onClose={onClose} />
      </div>
    </ModalBlur>
  );
};

export default AddGame;
