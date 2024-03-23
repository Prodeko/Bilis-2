import type { ReactNode } from "react";

import { StatsHeader } from "@ui/Header/Stats";

import styles from "./Layout.module.scss";

interface Props {
  children: ReactNode;
}

const StatsLayout = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <StatsHeader />
      {children}
    </div>
  );
};

export const dynamic = "force-dynamic";

export default StatsLayout;
