import type { ReactNode } from "react";

import { PlayerHeader } from "@ui/Header/Player";

import { PlayerLayoutOuter } from "@components/Player/PlayerLayout/Outer";

interface Props {
  children: ReactNode;
}

const PlayerLandingLayout = ({ children }: Props) => {
  return (
    <PlayerLayoutOuter>
      <PlayerHeader />
      {children}
    </PlayerLayoutOuter>
  );
};

export default PlayerLandingLayout;

export const dynamic = "force-dynamic";
