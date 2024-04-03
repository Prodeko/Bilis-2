"use client";

import { cva } from "class-variance-authority";
import { round } from "lodash";

import { type Player, SmoothScrollId } from "@common/types";
import { DEFAULT_ELO } from "@common/utils/constants";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useSeasonalMode from "@hooks/useSeasonalMode";
import {
  type Side,
  setFocus,
  setSelectedIdx,
  useModalState,
} from "@state/Modal";

type ListProps = {
  onChoose: () => void;
  side: Side;
  playerSearchList: Player[];
};

const rowStyles = cva(
  "texl-xl flex h-12 cursor-pointer items-center justify-between p-4 font-semibold transition-all duration-100",
  {
    variants: {
      selected: {
        true: "bg-primary-700",
        false: "bg-neutral-800",
      },
    },
  },
);

const PlayerList = ({ playerSearchList, onChoose, side }: ListProps) => {
  const [parent] = useAutoAnimate<HTMLDivElement>({ duration: 200 });
  const { seasonal } = useSeasonalMode();
  const hasPlayers = playerSearchList.length > 0;
  const [{ selectedIdx, focus }, dispatch] = useModalState();

  const isSelected = (i: number) => i === selectedIdx && focus === side;
  const onHover = (i: number) => {
    return () => {
      dispatch(setFocus(side));
      dispatch(setSelectedIdx(i));
    };
  };

  return (
    <div
      ref={parent}
      className="flex h-full w-full flex-col divide-y-2 divide-neutral-700 divide-opacity-40 overflow-y-scroll rounded-b-lg bg-neutral-800 text-neutral-200"
    >
      {hasPlayers ? (
        playerSearchList.map((p, i) => (
          <button
            id={isSelected(i) ? SmoothScrollId.Addgame : ""}
            className={rowStyles({ selected: isSelected(i) })}
            key={p.id}
            onClick={onChoose}
            onKeyUp={onChoose}
            onMouseEnter={onHover(i)}
            onMouseLeave={onHover(i)}
            tabIndex={0}
            type="button"
          >
            <span>
              {p.emoji} {p.firstName} {p.lastName}
            </span>
            <span>{round(seasonal ? p.seasonElo ?? DEFAULT_ELO : p.elo)}</span>
          </button>
        ))
      ) : (
        <span className="texl-4xl flex h-full w-full items-center justify-center rounded-b-lg bg-neutral-800 font-semibold text-neutral-200">
          No players found
        </span>
      )}
    </div>
  );
};

export default PlayerList;
