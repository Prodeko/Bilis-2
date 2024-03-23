"use client";

import { cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { FiBarChart2, FiHome, FiUser } from "react-icons/fi";

import type { Season } from "@common/types";
import useSeasonalMode from "@hooks/useSeasonalMode";

import SeasonToggle from "./SeasonToggle";
import SidebarLink from "./SidebarLink";

const styles = cva(
  "z-10 flex max-h-screen flex-col justify-between gap-4 bg-gradient-to-tr p-8",
  {
    variants: {
      seasonal: {
        true: "from-primary-900 to-neutral-700",
        false: "from-neutral-700 to-neutral-600",
      },
    },
  },
);
interface Props extends ComponentPropsWithoutRef<"aside"> {
  currentSeason: Season;
}

const Sidebar = ({ currentSeason, ...props }: Props) => {
  const { seasonal } = useSeasonalMode();
  return (
    <aside {...props} className={styles({ seasonal })}>
      <nav className="flex flex-col items-center gap-6 ">
        <SidebarLink path="/" Icon={FiHome} />
        <SidebarLink path="/stats" Icon={FiBarChart2} />
        <SidebarLink path="/player" Icon={FiUser} />
      </nav>
      <div className="flex flex-col items-center gap-6 ">
        {currentSeason && <SeasonToggle />}
        <p className="text-[6px] text-neutral-50">Version 1.3.2 - Rööki 🚬</p>
      </div>
    </aside>
  );
};

export default Sidebar;
