import type { Dispatch, SetStateAction } from "react";

import { ModalBlur } from "@ui/ModalBlur";

import type { RecentGame } from "@common/types";

import styles from "./AddGameModal.module.scss";
import CloseButton from "./CloseButton";
import Content from "./Content";

type PlayerProps = {
  onClose: () => void;
  setGames: Dispatch<SetStateAction<RecentGame[]>>;
};

const AddGame = ({ onClose, setGames }: PlayerProps) => {
  return (
    <ModalBlur>
      <div className={styles.modal}>
        <CloseButton onClose={onClose} />
        <Content setGames={setGames} onClose={onClose} />
      </div>
    </ModalBlur>
  );
};

export default AddGame;
