"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent, type MouseEvent, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

import { Card, CardGrid, type CardProps } from "@ui/Card";
import { Dropdown, Input, InputDropdownWrapper } from "@ui/InputDropdown";
import { Table, prepareQueueData, queueColumns } from "@ui/Table";
import { TitleRow } from "@ui/TitleRow";

import { type Player, SmoothScrollId } from "@common/types";
import useKeyPress from "@hooks/useKeyPress";
import usePlayers from "@hooks/usePlayers";
import { addToQueue, useQueueState } from "@state/Queue";

interface Props {
  cardProps: CardProps;
}

export const Queue = ({ cardProps }: Props) => {
  const router = useRouter();
  const [queue, dispatch] = useQueueState();
  const [visible, setVisible] = useState<boolean>(false);
  const { players, setQuery } = usePlayers(200);
  const filteredPlayers = players.filter(
    (player) => !queue.some((queuePlayer) => queuePlayer.id === player.id),
  );

  const openDropdown = () => setVisible(true);
  const closeDropdown = () => setVisible(false);

  const queueId = SmoothScrollId.Queue;
  const getInputElement = () =>
    document?.getElementById?.(queueId) as HTMLInputElement; // This needs to be a function so it does not get evaluated on the server-side
  const focusInputField = () => getInputElement().focus();
  const clearInputField = () => {
    setQuery("");
    getInputElement().value = "";
  };

  const handleSelect = (player: Player) => {
    dispatch(addToQueue(player));
    clearInputField();
    closeDropdown();
  };

  const preventInputBlur = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    openDropdown();
    setQuery(e.target.value);
    setSelectedIdx(0);
  };

  const { handleKeyPress, selectedIdx, setSelectedIdx } = useKeyPress(
    filteredPlayers,
    handleSelect,
    queueId,
  );

  const tableRowClick = (id: number) => {
    return (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      const href = `/player/${id}`;
      router.push(href);
    };
  };

  return (
    <Card {...cardProps}>
      <CardGrid>
        <TitleRow title="Queue">
          <InputDropdownWrapper
            style={{
              gridColumnStart: "4",
              gridColumnEnd: "-1",
            }}
          >
            <Input
              inputId={queueId}
              IconLeadingProps={{ Icon: FiSearch }}
              IconTrailingProps={{
                Icon: FiX,
                onClick: () => {
                  clearInputField();
                  focusInputField();
                },
                onMouseDown: preventInputBlur,
              }}
              onClick={openDropdown}
              onBlur={closeDropdown}
              onFocus={openDropdown}
              onChange={handleChange}
              placeholder="Add player to queue"
              onKeyDown={handleKeyPress}
            />
            <Dropdown
              arr={filteredPlayers}
              emptyArrayText={"No Players Found"}
              selectedIdx={selectedIdx}
              showDropdown={visible}
              smoothScrollId={queueId}
              rowOnClick={handleSelect}
            />
          </InputDropdownWrapper>
        </TitleRow>
        <Table
          dataRows={prepareQueueData(queue, dispatch)}
          columns={queueColumns}
          columnStartIndices={[1, 4, -1]}
          rowOnClick={tableRowClick}
        />
      </CardGrid>
    </Card>
  );
};
