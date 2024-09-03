"use client";

import axios from "axios";

import {
  type GameTableSchema,
  getGameColumnSchema,
} from "@ui/MultifunctionTable/schemas";

import { elo } from "@common/types";
import {
  formatFullName,
  formatIsoStringToDate,
} from "@common/utils/helperFunctions";
import {
  type PaginatedQueryParams,
  TableWithServerPagination,
} from "@components/ui/MultifunctionTable/ServerPagination";
import { GameModel } from "@server/models";
import { useQuery } from "@tanstack/react-query";

interface Props {
  data: GameTableSchema[];
}

export const TableProvider = ({ data: initialData }: Props) => {
  const columns = getGameColumnSchema();
  const useFetchData = (params: PaginatedQueryParams) =>
    useQuery({
      queryKey: ["getLatestGames", params],
      queryFn: async () => {
        console.log("Column filters", params.columnFilters);
        const response = await axios.get("/api/stats/games", {
          params: {
            ...params,
            columnFilters: undefined,
            filterId: params.columnFilters.find((filter) => filter.id === "id")
              ?.value,
            filterWinnerName: params.columnFilters.find(
              (filter) => filter.id === "winner",
            )?.value,
            filterLoserName: params.columnFilters.find(
              (filter) => filter.id === "loser",
            )?.value,
            filterWinnerEloMin: params.columnFilters.find(
              (filter) => filter.id === "winnerEloAfter",
            )?.value?.[0],
            filterWinnerEloMax: params.columnFilters.find(
              (filter) => filter.id === "winnerEloAfter",
            )?.value?.[1],
            filterLoserEloMin: params.columnFilters.find(
              (filter) => filter.id === "loserEloAfter",
            )?.value?.[0],
            filterLoserEloMax: params.columnFilters.find(
              (filter) => filter.id === "loserEloAfter",
            )?.value?.[1],
            filterCreatedAtMin: params.columnFilters.find(
              (filter) => filter.id === "time",
            )?.value,
            filterUnderTable: params.columnFilters.find(
              (filter) => filter.id === "underTable",
            )?.value,
          },
        });

        return {
          data: response.data.games.map((game: GameModel) => ({
            time: formatIsoStringToDate(game.createdAt),
            winner: game.winner
              ? formatFullName(game.winner, true, !!game.winner.nickname)
              : "Winner name not found",
            loser: game.loser
              ? formatFullName(game.loser, true, !!game.loser.nickname)
              : "Loser name not found",
            winnerFargoNow: elo.parse(Number(game.winnerEloAfter.toFixed(2))),
            winnerFargoDifference: game.winnerEloAfter - game.winnerEloBefore,
            loserFargoNow: elo.parse(Number(game.loserEloAfter.toFixed(2))),
            loserFargoDifference: game.loserEloAfter - game.loserEloBefore,
            underTable: game.underTable ? "💩" : " ",
          })),
          pageCount: response.data.pageCount,
        };
      },
    });

  return (
    <TableWithServerPagination
      {...{
        initialData,
        columns,
        useFetchData,
      }}
    />
  );
};
