import type { ReactNode } from "react";

import { PlayerLayoutOuter } from "@components/Player/PlayerLayout/Outer";
import { PlayerHeader } from "@components/ui/Header/Player";

interface Props {
  children: ReactNode;
}

const EditLayout = ({ children }: Props) => {
  return (
    <PlayerLayoutOuter>
      <PlayerHeader />
      {children}
    </PlayerLayoutOuter>
  );
};

export default EditLayout;

export const dynamic = "force-dynamic";
