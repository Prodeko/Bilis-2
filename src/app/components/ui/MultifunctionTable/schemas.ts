import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";

export interface PlayerTableSchema {
  position: number;
  fullName: string;
  fargo: number;
  gameCount: number;
  winCount: number;
  winPercentage: number;
}

export interface GameTableSchema {
  time: string;
  winner: string;
  winnerFargoNow: number;
  winnerFargoDifference: number;
  loser: string;
  loserFargoNow: number;
  loserFargoDifference: number;
  underTable: string;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getGameColumnSchema = (): ColumnDef<GameTableSchema, any>[] => {
  const columnHelper = createColumnHelper<GameTableSchema>();
  return [
    columnHelper.accessor("time", {
      header: "time",
      cell: (info) => info.getValue(),
      meta: {
        dataType: "string",
      },
    }),
    columnHelper.accessor("winner", {
      header: "winner",
      cell: (info) => info.getValue(),
      meta: {
        dataType: "string",
      },
    }),
    columnHelper.accessor("winnerFargoNow", {
      id: "winnerEloAfter",
      header: "w.fargo",
      cell: (info) => info.getValue(),
      meta: {
        dataType: "number",
      },
    }),
    columnHelper.accessor("loser", {
      header: "loser",
      cell: (info) => info.getValue(),
      meta: {
        dataType: "string",
      },
    }),
    columnHelper.accessor("loserFargoNow", {
      id: "loserEloAfter",
      header: "l.fargo",
      cell: (info) => info.getValue(),
      meta: {
        dataType: "number",
      },
    }),
    columnHelper.accessor("underTable", {
      header: "ut",
      cell: (info) => info.getValue(),
      meta: {
        dataType: "boolean",
      },
    }),
  ];
};

export const getPlayerColumnSchema = () => {
  const columnHelper = createColumnHelper<PlayerTableSchema>();
  return [
    columnHelper.accessor("position", {
      header: "pos",
      cell: (info) => info.getValue(),
      meta: {
        dataType: "number",
      },
    }),
    columnHelper.accessor("fullName", {
      header: "name",
      cell: (info) => info.getValue(),
      meta: {
        dataType: "string",
      },
    }),
    columnHelper.accessor("fargo", {
      header: "fargo",
      cell: (info) => info.getValue(),
      meta: {
        dataType: "number",
      },
    }),
    columnHelper.accessor("gameCount", {
      header: "games",
      cell: (info) => info.getValue(),
      meta: {
        dataType: "number",
      },
    }),
    columnHelper.accessor("winCount", {
      header: "wins",
      cell: (info) => info.getValue(),
      meta: {
        dataType: "number",
      },
    }),
    columnHelper.accessor("winPercentage", {
      header: "win %",
      cell: (info) => info.getValue(),
      meta: {
        dataType: "number",
      },
    }),
  ];
};
