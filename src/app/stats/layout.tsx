import type { ReactNode } from "react";

import { StatsHeader } from "@ui/Header/Stats";

interface Props {
  children: ReactNode;
}

const StatsLayout = ({ children }: Props) => {
  return (
    <div className="grid h-full grid-rows-[auto_minmax(0,_1fr)]">
      <StatsHeader />
      {children}
    </div>
  );
};

export const dynamic = "force-dynamic";

export default StatsLayout;
