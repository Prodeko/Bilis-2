"use client";

import { cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { FiBarChart2, FiHome, FiUser } from "react-icons/fi";

import { SidebarLink } from "@ui/Sidebar/SidebarLink";
import { Toggle } from "@ui/Toggle";

import type { Season } from "@common/types";
import useSeasonalMode from "@hooks/useSeasonalMode";

const styles = cva(
  "z-10 flex max-h-screen flex-col justify-between gap-4 bg-gradient-to-tr p-8",
  {
    variants: {
      seasonal: {
        true: "from-primary-900 to-primary-800",
        false: "from-neutral-700 to-neutral-600",
      },
    },
  },
);
interface Props extends ComponentPropsWithoutRef<"aside"> {
  currentSeason: Season;
}

export const Sidebar = ({ currentSeason, ...props }: Props) => {
  const { seasonal, toggleSeasonalMode } = useSeasonalMode();
  return (
    <aside {...props} className={styles({ seasonal })}>
      <nav className="flex flex-col items-center gap-6 ">
        <SidebarLink path="/" Icon={FiHome} />
        <SidebarLink path="/stats" Icon={FiBarChart2} />
        <SidebarLink path="/player" Icon={FiUser} />
      </nav>
      <div className="flex flex-col items-center gap-6 ">
        {currentSeason && (
          <Toggle on={seasonal} onChange={toggleSeasonalMode} />
        )}
        <p className="text-[6px] text-neutral-50">
          Version 1.3.3 - Jaffakeksi 🍪{" "}
        </p>
      </div>
    </aside>
  );
};
