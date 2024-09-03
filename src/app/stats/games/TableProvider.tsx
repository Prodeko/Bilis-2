"use client";

import axios from "axios";

import {
  type GameTableSchema,
  getGameColumnSchema,
} from "@ui/MultifunctionTable/schemas";

import { mapLatestGameToFrontend } from "@common/utils/gameStats";
import {
  type PaginatedQueryParams,
  TableWithServerPagination,
} from "@components/ui/MultifunctionTable/ServerPagination";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

interface Props {
  data: GameTableSchema[];
  pageCount: number;
}

export const TableProvider = ({ data: initialData, pageCount }: Props) => {
  const columns = getGameColumnSchema();
  const useFetchData = (params: PaginatedQueryParams) =>
    useQuery({
      queryKey: ["getLatestGames", params],
      queryFn: async () => {
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
          data: response.data.games.map(mapLatestGameToFrontend),
          pageCount: response.data.pageCount,
        };
      },
    });

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TableWithServerPagination
        {...{
          initialData,
          initialPageCount: pageCount,
          columns,
          useFetchData,
        }}
      />
    </QueryClientProvider>
  );
};
