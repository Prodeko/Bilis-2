"use client";

import { type Dispatch, type SetStateAction, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

import { TextButton } from "@ui/Buttons/TextButton";
import { Card, type CardProps } from "@ui/Card";
import { Table, gameColumns, prepareGamesData } from "@ui/Table";
import { TitleRow } from "@ui/TitleRow";

import type { RecentGame } from "@common/types";

import { GameDeletionModal } from "./GameDeletionModal";

interface Props {
  games: RecentGame[];
  setGames: Dispatch<SetStateAction<RecentGame[]>>;
  cardProps: CardProps;
}
const Games = ({ games, setGames, cardProps }: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const closeModal = () => setModalVisible(false);
  const showModal = () => setModalVisible(true);

  return (
    <Card tableGrid {...cardProps}>
      <TitleRow title="Games">
        <TextButton
          buttonType="button"
          style={{
            gridColumnStart: "11",
            gridColumnEnd: "-1",
          }}
          intent="destructive"
          text={"Remove Latest"}
          RightIcon={FiTrash2}
          onClick={showModal}
        />
        {modalVisible && (
          <GameDeletionModal
            games={games}
            setGames={setGames}
            closeModal={closeModal}
          />
        )}
      </TitleRow>
      <Table
        dataRows={prepareGamesData(games)}
        columns={gameColumns}
        columnStartIndices={[1, 3, 6, 8, 11]}
        disableRowHoverEffects
      />
    </Card>
  );
};

export default Games;
