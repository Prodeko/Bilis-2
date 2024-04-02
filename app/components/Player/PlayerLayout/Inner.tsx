import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const PlayerLayoutInner = ({ children }: Props) => {
  return (
    <div className="relative flex h-full items-center justify-center text-neutral-100">
      {children}
    </div>
  );
};
