"use client";

// disable annoying esling warnings

/* eslint-disable react/require-default-props */
import { cva } from "class-variance-authority";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ChangeEventHandler } from "react";

import type { Player } from "@common/types";
import { formatFullName } from "@common/utils/helperFunctions";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useKeyPress from "@hooks/useKeyPress";
import usePlayers from "@hooks/usePlayers";

interface Props {
  visible: boolean;
  onClick: () => void;
  onBlur: () => void;
}

const containerStyles = cva(
  "grow overflow-x-hidden overflow-y-scroll rounded-lg bg-white text-neutral-800 transition-all duration-300",
  {
    variants: {
      visible: {
        true: "max-h-full",
        false: "max-h-0",
      },
    },
  },
);

const linkStyles = cva(
  "flex cursor-pointer justify-between p-2 text-lg font-normal",
  {
    variants: {
      selected: {
        true: "hover:bg-neutral-300",
      },
    },
  },
);

export const PlayerSearchLink = ({ visible, onClick, onBlur }: Props) => {
  const getRoute = (id: number) => `player/${id}`;
  const router = useRouter();
  const handleSelect = ({ id }: Player) => router.push(getRoute(id));

  const { players, setQuery } = usePlayers(300);
  const { handleKeyPress, selectedIdx, setSelectedIdx } = useKeyPress(
    players,
    handleSelect,
  );
  const [parent, enableAnimations] = useAutoAnimate<HTMLDivElement>({
    duration: 300,
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    enableAnimations(false);
    setTimeout(() => enableAnimations(true), 300);
    setQuery(e.target.value);
    onClick();
    setSelectedIdx(0);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <input
        className="w-full rounded-lg bg-white p-3 text-black"
        placeholder={"Search for a player"}
        onClick={onClick}
        onKeyDown={handleKeyPress}
        onChange={handleChange}
        onBlur={onBlur}
      />
      {/* The following line keeps the borders round, even if the list is not 100% height */}
      <div className="max-h-full min-h-0 grow rounded-lg">
        <div ref={parent} className={containerStyles({ visible })}>
          {players.length > 0 ? (
            players.map((player, i) => (
              <Link
                className={linkStyles({ selected: i === selectedIdx })}
                key={player.id}
                href={getRoute(player.id)}
                passHref
                onMouseDown={(e) => e.preventDefault()} // We need to block the onBlur effect first: https://stackoverflow.com/questions/17769005/onclick-and-onblur-ordering-issue/#57630197
                onClick={() => handleSelect(player)}
              >
                <div className="flex w-full items-center gap-1">
                  <span>#{player.id}</span>
                  <span>{formatFullName(player, true, false)}</span>
                </div>
                <span>{Math.floor(player.elo)}</span>
              </Link>
            ))
          ) : (
            <li className="flex h-full items-center justify-center p-16 text-4xl font-bold text-neutral-800">
              No Players Found
            </li>
          )}
        </div>
      </div>
    </div>
  );
};
