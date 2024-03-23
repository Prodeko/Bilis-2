"use client";

import { cva } from "class-variance-authority";
import { useState } from "react";

import PlayerSearchLink from "@ui/PlayerSearch/PlayerSearchLink";

const styles = cva(
  "max-h-1/2 grid w-3/4 grid-rows-[auto_minmax(0,_1fr)] gap-4 text-left transition-all duration-[0.7s]",
  {
    variants: {
      extended: {
        true: "min-h-[75%]",
        false: "min-h-[25%]",
      },
    },
  },
);

const PlayerPage = () => {
  const [extended, setExtended] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const onBlur = () => {
    setVisible(false);
    setTimeout(() => setExtended(false), 400); // The same length as extendind transformation in PlayerSearchLink.moudule.scss %resultContainer placeholder class
  };

  const onClick = () => {
    if (!extended) {
      setExtended(true);
      setTimeout(() => setVisible(true), 700); // // The same length as extendind transformation in PlayerSearchLink.moudule.scss %resultContainer placeholder class
    }
  };

  return (
    <div className="flex h-full items-center justify-center p-12">
      <div className={styles({ extended })}>
        <h1 className="text-5xl font-semibold text-white">Player Search</h1>
        <PlayerSearchLink visible={visible} onClick={onClick} onBlur={onBlur} />
      </div>
    </div>
  );
};

export default PlayerPage;

export const dynamic = "force-dynamic";
