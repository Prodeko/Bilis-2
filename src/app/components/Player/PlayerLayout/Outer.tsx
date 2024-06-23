import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const PlayerLayoutOuter = ({ children }: Props) => {
  return (
    <div className="grid h-full grid-rows-[auto_minmax(0_,1fr)] text-neutral-100">
      {children}
    </div>
  );
};
