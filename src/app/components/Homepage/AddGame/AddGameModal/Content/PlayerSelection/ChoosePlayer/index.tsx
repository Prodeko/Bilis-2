"use client";

import type { KeyboardEventHandler } from "react";

import { SmoothScrollId } from "@common/types";
import { createSmoothScrollFn } from "@common/utils/helperFunctions";
import { PlayerList } from "@components/Homepage/AddGame/AddGameModal/Content/PlayerSelection/ChoosePlayer/PlayerList";
import { PlayerSearch } from "@components/Homepage/AddGame/AddGameModal/Content/PlayerSelection/ChoosePlayer/PlayerSearch";
import { QueuePlayers } from "@components/Homepage/AddGame/AddGameModal/Content/PlayerSelection/ChoosePlayer/QueuePlayers";
import {
  type Side,
  decrementSelectedIdx,
  incrementSelectedIdx,
  setFocus,
  setPlayerId,
  useModalState,
} from "@state/Modal";
import { useQueueState } from "@state/Queue";

type PlayerProps = {
  filterId: number | undefined;
  side: Side;
};

export const ChoosePlayer = ({ filterId, side }: PlayerProps) => {
  const [{ playerSearchLists, selectedIdx }, dispatch] = useModalState();
  const [queue] = useQueueState();
  const smoothScroll = createSmoothScrollFn(SmoothScrollId.Addgame);

  const queuePlayers = queue.filter((p) => p.id !== filterId);
  const playerSearchList = playerSearchLists[side].filter(
    (p) => p.id !== filterId,
  );
  const selectedPlayer =
    queuePlayers?.[queuePlayers.length + selectedIdx] ||
    playerSearchList?.[selectedIdx];

  const onChoose = () => {
    dispatch(setFocus(side === "winner" ? "loser" : "winner"));
    dispatch(setPlayerId(side, selectedPlayer?.id));
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    switch (e.key) {
      case "ArrowUp":
        // dont select users over the list
        if (selectedIdx > -queuePlayers.length) {
          dispatch(decrementSelectedIdx());
          smoothScroll();
        }
        break;

      case "ArrowDown":
        // dont select users over the list
        if (selectedIdx < playerSearchList.length - 1) {
          dispatch(incrementSelectedIdx());
          smoothScroll();
        }
        break;

      case "ArrowRight":
        dispatch(setFocus("loser"));
        break;

      case "ArrowLeft":
        dispatch(setFocus("winner"));
        break;

      case "Enter":
        onChoose();
        break;
    }
  };

  return (
    <div className="grid h-[90%] grid-rows-2 gap-y-6">
      <div className="grid grid-rows-[auto_minmax(0_,1fr)] shadow-xl">
        <h3 className="flex h-12 w-full items-center justify-center rounded-t-xl bg-primary-800 text-2xl font-semibold capitalize text-white">
          Queue
        </h3>
        <QueuePlayers onChoose={onChoose} side={side} players={queuePlayers} />
      </div>
      <div className="grid grid-rows-[auto_minmax(0_,1fr)] shadow-xl">
        <PlayerSearch side={side} handleKeyDown={handleKeyDown} />
        <PlayerList
          onChoose={onChoose}
          side={side}
          playerSearchList={playerSearchList}
        />
      </div>
    </div>
  );
};
