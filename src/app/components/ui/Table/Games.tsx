import { round } from "lodash";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

import type { RecentGame } from "@common/types";
import { createColumnHelper } from "@tanstack/react-table";

export interface TableGame {
  time: string;
  winner: JSX.Element;
  winnerFargo: JSX.Element;
  loser: JSX.Element;
  loserFargo: JSX.Element;
}

/**
 *
 * @param data - Most recent games from the database
 * @returns Formatted games that can be passed to the Games table
 */
export const prepareGamesData = (data: RecentGame[]): TableGame[] => {
  return data.map((game, _index) => ({
    time: game.formattedTimeString,
    winner: (
      <Link
        className="min-h-full w-fit truncate border-b-2 border-transparent transition-all duration-100 hover:border-b-primary-300 active:border-b-primary-200"
        href={`/player/${game.winnerId}`}
      >
        {game.winner}
      </Link>
    ),
    winnerFargo: (
      <div className="flex w-full shrink-0 items-center gap-1 truncate">
        <span>{round(game.winnerEloBefore)}</span>
        <span>
          <FiChevronRight />
        </span>
        <span>{round(game.winnerEloAfter)}</span>
      </div>
    ),
    loser: (
      <Link
        className="min-h-full w-fit truncate border-b-2 border-transparent transition-all duration-100 hover:border-b-primary-300 active:border-b-primary-200"
        href={`/player/${game.loserId}`}
      >
        {game.loser}
      </Link>
    ),
    loserFargo: (
      <div className="flex w-full shrink-0 items-center gap-1 truncate">
        <span>{round(game.loserEloBefore)}</span>
        <span>
          <FiChevronRight />
        </span>
        <span>{round(game.loserEloAfter)}</span>
        {game.underTable && <span>💩</span>}
      </div>
    ),
  }));
};

const columnHelper = createColumnHelper<TableGame>();

export const gameColumns = [
  columnHelper.accessor("time", {
    header: "Time",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("winner", {
    header: "Winner",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("winnerFargo", {
    header: "Winner Fargo",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("loser", {
    header: "Loser",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("loserFargo", {
    header: "Loser Fargo",
    cell: (info) => info.getValue(),
  }),
];
