import Image from "next/image";
import type { ComponentProps } from "react";
import { HiCog } from "react-icons/hi";

import { TextButton } from "@ui/Buttons/TextButton";
import { MottoCard } from "@ui/MottoCard";

import type { Player } from "@common/types";
import { formatFullName } from "@common/utils/helperFunctions";
import billiardPic from "@public/images/billiard–closeup.jpg";
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
    <header {...props} className="relative h-72">
      <Image
        src={billiardPic}
        alt="Billiard Player"
        style={{ objectFit: "cover" }}
        fill
        priority
      />
      <div className="col-span-full grid h-72 w-full grid-cols-8 items-center justify-between gap-12 bg-gradient-to-tr from-neutral-900 to-neutral-800 p-12 opacity-80">
        <div
          style={{ gridColumn: "1 / 2" }}
          className="flex aspect-square h-full items-center justify-center rounded-[50%] bg-white text-7xl font-bold shadow-lg"
        >
          <span className="flex h-full w-full items-center justify-center">
            {emoji}
          </span>
        </div>
        <div
          style={{ gridColumn: "2 / 5" }}
          className="flex flex-col items-center justify-center gap-4 text-neutral-100"
        >
          <span className="max-w-full truncate text-center text-4xl font-semibold text-white">
            {name}
          </span>
          <TextButton
            intent={"primary"}
            buttonType="a"
            href={`/player/${id}/edit`}
            text="Edit player"
            RightIcon={HiCog}
          />
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
