"use client";

import type { GameTableSchema } from "@ui/MultifunctionTable/schemas";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TableProvider } from "./TableProvider";

const StatsGamesPage = async () => {
  const data: GameTableSchema[] = [];
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TableProvider data={data} />
    </QueryClientProvider>
  );
};

export default StatsGamesPage;

export const dynamic = "force-dynamic";
