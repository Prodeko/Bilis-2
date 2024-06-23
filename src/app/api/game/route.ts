import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { type AddedGameResponse, createGameType } from "@common/types";
import { createGame, removeLatestGame } from "@server/db/games";
import { formatRecentGame } from "@server/db/games/derivatives";

export async function POST(req: Request) {
  const json = await req.json();
  const parsedCreateGameType = createGameType.parse(json);
  const game = await createGame(parsedCreateGameType);
  const jsonGame = formatRecentGame(game);
  revalidatePath("/stats");

  return NextResponse.json({
    recentGame: jsonGame,
    winner: game.winner,
    loser: game.loser,
  } as AddedGameResponse);
}

export async function DELETE() {
  const removedLatestGame = await removeLatestGame();
  return NextResponse.json(removedLatestGame);
}

export const dynamic = "force-dynamic";
