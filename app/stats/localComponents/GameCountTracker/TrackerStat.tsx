import type { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"div"> {
  number: number;
  timeFrame: string;
}

export const TrackerStat = ({ number, timeFrame }: Props) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-5xl font-semibold text-neutral-100">{number}</span>
      <span className="text-xl font-medium text-neutral-400">{timeFrame}</span>
    </div>
  );
};
