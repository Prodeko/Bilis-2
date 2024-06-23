import type { ComponentProps } from "react";

import { TrackerStat } from "@/app/stats/localComponents/GameCountTracker/TrackerStat";
import { getGamesFromTimeframe } from "@server/db/players/gameTracker";

type DivProps = ComponentProps<"div">;

type Props = DivProps;

export const GameCountTracker = async ({ ...props }: Props) => {
  const stats = [
    {
      number: await getGamesFromTimeframe("day"),
      timeFrame: "Today",
    },
    {
      number: await getGamesFromTimeframe("week"),
      timeFrame: "This week",
    },
    {
      number: await getGamesFromTimeframe("month"),
      timeFrame: "This month",
    },
    {
      number: await getGamesFromTimeframe("year"),
      timeFrame: "This year",
    },
  ];
  return (
    <div
      {...props}
      className="grid h-full grid-rows-[auto_minmax(0,_1fr)] gap-y-3 p-12"
    >
      <h2 className="w-full text-center text-5xl font-bold capitalize text-neutral-200">
        Game tracker
      </h2>
      <div className="flex items-center justify-around gap-12">
        {stats.map((stat) => {
          return (
            <TrackerStat
              key={stat.timeFrame}
              number={stat.number}
              timeFrame={stat.timeFrame}
            />
          );
        })}
      </div>
    </div>
  );
};
