import RandomPlayer from "app/components/Homepage/RandomPlayer";
import Image from "next/image";
import type { ComponentProps } from "react";

import HeaderTitle from "@ui/Header/HeaderTitle";

import billiardPic from "@public/images/billiard-balls.jpg";
import { getRandomPlayer } from "@server/db/players";
import { getCurrentSeason } from "@server/db/seasons";

type HeaderProps = ComponentProps<"header">;

type Props = HeaderProps & {
  seasonal: boolean;
};

export const MainHeader = async ({ seasonal, ...props }: Props) => {
  const randomPlayer = await getRandomPlayer().then((player) =>
    player?.toJSON(),
  );
  const currentSeason = await getCurrentSeason();
  return (
    <header {...props} className="relative grid h-72 grid-cols-6 items-center">
      <Image
        src={billiardPic}
        alt="Billiard Table"
        style={{ objectFit: "cover" }}
        fill
        priority
      />
      <div className="relative col-span-full grid h-72 w-full grid-cols-3 items-center justify-between gap-6 bg-gradient-to-tr from-neutral-900 to-neutral-800 px-12  opacity-80">
        <HeaderTitle
          currentSeason={currentSeason}
          title="Biliskilke"
          style={{ gridColumn: 1 / 2 }}
        />
        <RandomPlayer randomPlayer={randomPlayer} />
      </div>
    </header>
  );
};
