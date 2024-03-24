import { type Dispatch, type SetStateAction, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

import { Button } from "@ui/Button";
import { Card, CardGrid, type CardProps } from "@ui/Card";
import { Table, gameColumns, prepareGamesData } from "@ui/Table";
import { TitleRow } from "@ui/TitleRow";

import type { RecentGame } from "@common/types";

import Modal from "./Modal";

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
    <Card {...cardProps}>
      <CardGrid>
        <TitleRow title="Games">
          <Button
            style={{
              gridColumnStart: "11",
              gridColumnEnd: "-1",
            }}
            variation="destructive"
            text={"Remove Latest"}
            Icon={FiTrash2}
            onClick={showModal}
          />
          {modalVisible && (
            <Modal games={games} setGames={setGames} closeModal={closeModal} />
          )}
        </TitleRow>
        <Table
          dataRows={prepareGamesData(games)}
          columns={gameColumns}
          columnStartIndices={[1, 3, 6, 8, 11]}
          disableRowHoverEffects
        />
      </CardGrid>
    </Card>
  );
};

export default Games;
