import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const CardGrid = ({ children }: Props) => {
  return (
    <div className="grid h-full grid-rows-[auto_minmax(0,_1fr)] gap-y-3 py-6">
      {children}
    </div>
  );
};
