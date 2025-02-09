import type { ComponentProps } from "react";
import {
  AiOutlineFire,
  AiOutlineHistory,
  AiOutlineLineChart,
  AiOutlinePercentage,
  AiOutlineSketch,
  AiOutlineTrophy,
} from "react-icons/ai";

import { HallOfFameStatRow } from "@/app/stats/localComponents/HallOfFame/HallOfFameStatRow";
import { NEXT_PUBLIC_API_URL } from "@/config";

type DivProps = ComponentProps<"div">;

type Props = DivProps;

export const HallOfFame = async ({ ...props }: Props) => {
  const hofIcons = [
    {
      statName: "Highest Peak Fargo",
      Icon: AiOutlineTrophy,
    },
    {
      statName: "Longest Win Streak",
      Icon: AiOutlineLineChart,
    },
    {
      statName: "Current Highest Win Percentage",
      Icon: AiOutlinePercentage,
    },
    {
      statName: "Most Games Played Alltime",
      Icon: AiOutlineSketch,
    },
    {
      statName: "Most Opponents Put Undertable",
      Icon: AiOutlineFire,
    },
    {
      statName: "Most Games Played In A Single Day",
      Icon: AiOutlineHistory,
    },
  ];

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let hofPlayersStats: any;

  try {
    const req = await fetch(`${NEXT_PUBLIC_API_URL}/hof`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("SOME DATA:");
    console.log(JSON.stringify(req, null, 2));
    const hofPlayersStats = await req.json();
  } catch (e) {
    console.log("FAILED!!!!");
    console.log(e);
  }

  const hofPlayers = hofIcons.map((icon, i) => {
    return {
      ...icon,
      hofPlayer: hofPlayersStats[i],
    };
  });

  return (
    <div
      {...props}
      className="grid h-full w-full grid-rows-[auto_minmax(0,_1fr)]  gap-8 px-12 py-16"
    >
      <h2 className="w-full text-center text-6xl font-bold uppercase text-neutral-100">
        Hall of Fame
      </h2>
      <div className="flex w-full flex-col divide-y-2 divide-neutral-600 overflow-y-auto">
        {hofPlayers.map((player) => {
          return (
            <HallOfFameStatRow
              key={player.statName}
              hofPlayer={player.hofPlayer}
              statName={player.statName}
              Icon={player.Icon}
            />
          );
        })}
      </div>
    </div>
  );
};
