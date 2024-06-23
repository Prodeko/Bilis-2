"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

import { AddPlayerButton } from "@ui/AddPlayerButton";
import { HeaderTitle } from "@ui/Header/HeaderTitle";

import billiardPic from "@public/images/billiard–closeup.jpg";

type HeaderProps = ComponentProps<"header">;

type Props = HeaderProps;

export const PlayerHeader = ({ ...props }: Props) => {
  const pathName = usePathname();
  const isLandingPage = pathName?.toLowerCase()?.endsWith("/player");

  return (
    <header {...props} className="relative grid h-72 grid-cols-3 items-center">
      <Image
        src={billiardPic}
        alt="Billiard Table"
        style={{ objectFit: "cover" }}
        fill
        priority
      />
      <div className="relative col-span-full grid h-72 w-full grid-cols-3 items-center justify-between gap-6 bg-gradient-to-tr from-neutral-900 to-neutral-800 px-12  opacity-80">
        <HeaderTitle title="Player" style={{ gridColumn: "1 / 2" }} />
        {isLandingPage && (
          <AddPlayerButton
            path="/player/new"
            text="create a new player"
            style={{ gridColumn: "3 / -1" }}
          />
        )}
      </div>
    </header>
  );
};
