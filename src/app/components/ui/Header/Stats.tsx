import Image from "next/image";
import type { ComponentProps } from "react";

import { HeaderTitle } from "@ui/Header/HeaderTitle";
import { Navigation } from "@ui/Header/StatsNavigation";

import statsPic from "@public/images/stats-header.jpg";

type HeaderProps = ComponentProps<"header">;

type Props = HeaderProps;

export const StatsHeader = ({ ...props }: Props) => {
  return (
    <header {...props} className="relative grid h-72 grid-cols-6 items-center">
      <Image
        src={statsPic}
        alt="Stats Charts"
        style={{ objectFit: "cover" }}
        fill
        priority
      />
      <div className="relative col-span-full flex h-72 w-full items-center justify-between gap-6 bg-gradient-to-tr from-neutral-900 to-neutral-800 px-12 opacity-80">
        <HeaderTitle title="Stats" style={{ gridColumn: "1 / 2" }} />
        <Navigation
          links={[
            {
              href: "/stats",
              linkName: "main",
            },
            {
              href: "/stats/players",
              linkName: "players",
            },
            {
              href: "/stats/games",
              linkName: "games",
            },
          ]}
        />
      </div>
    </header>
  );
};
