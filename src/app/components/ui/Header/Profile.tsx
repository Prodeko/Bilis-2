import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";

import { MottoCard } from "@ui/MottoCard";

import type { Player } from "@common/types";
import { formatFullName } from "@common/utils/helperFunctions";
import billiardPic from "@public/images/billiard–closeup.jpg";
import Settings from "@public/images/settings-01.svg";
import { getPlayerById } from "@server/db/players";

type HeaderProps = ComponentProps<"header">;

interface Props extends HeaderProps {
  playerId: number;
}

export const ProfileHeader = async ({ playerId, ...props }: Props) => {
  const player = (await getPlayerById(playerId).then((player) =>
    player?.toJSON(),
  )) as Player;
  const { id, emoji, motto } = player;
  const name = formatFullName(player, false, !!player.nickname);

  return (
    <header {...props} className="relative grid h-72 grid-cols-8 items-center">
      <Image
        src={billiardPic}
        alt="Billiard Player"
        style={{ objectFit: "cover" }}
        fill
        priority
      />
      <div className="relative col-span-full grid h-72 w-full grid-cols-8 items-center justify-between gap-6 bg-gradient-to-tr from-neutral-900 to-neutral-800 p-12 opacity-80">
        <div
          style={{ gridColumn: "1 / 2" }}
          className="relative flex aspect-square max-w-[70%] items-center justify-center rounded-[50%] bg-white text-7xl font-bold shadow-lg"
        >
          <span>{emoji}</span>
          <Link
            className="absolute left-2 top-2 flex aspect-square cursor-pointer items-center rounded-[50%] border-2 border-black bg-neutral-300 p-3 text-primary-700 transition-all duration-200"
            href={`/player/${id}/edit`}
          >
            <Image className="h-8 w-8" src={Settings} alt="Edit player" />
          </Link>
        </div>
        <div
          style={{ gridColumn: "2 / 5" }}
          className="flex flex-col items-center gap-4 text-neutral-100"
        >
          <span className="text-center text-4xl font-semibold text-white">
            {name}
          </span>
        </div>
        <MottoCard
          style={{ gridColumn: "5 / -1" }}
          text={motto}
          author={name}
          switching={false}
        />
      </div>
    </header>
  );
};
