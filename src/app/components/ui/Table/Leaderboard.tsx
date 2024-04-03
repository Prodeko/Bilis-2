import { round } from "lodash";

import type { Player, WithId } from "@common/types";
import { formatFullName } from "@common/utils/helperFunctions";
import { createColumnHelper } from "@tanstack/react-table";

export interface LeaderboardPlayer extends WithId {
  position: string;
  fullName: JSX.Element;
  fargo: number;
}

/**
 *
 * @param data - Leaderboard players from the database
 * @returns Formatted leaderboard players
 */
export const prepareLeaderboardData = (data: Player[]): LeaderboardPlayer[] => {
  return data.map((row, index) => ({
    id: row.id,
    position: `${index + 1}.`,
    fullName: (
      <span className="w-full truncate">
        {formatFullName(row, true, row.nickname)}
      </span>
    ),
    fargo: round(row.elo),
  }));
};

const columnHelper = createColumnHelper<LeaderboardPlayer>();

export const leaderboardColumns = [
  columnHelper.accessor("position", {
    header: "Position",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("fullName", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("fargo", {
    header: "Fargo",
    cell: (info) => info.getValue(),
  }),
];
