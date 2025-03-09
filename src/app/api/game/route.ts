import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { type AddedGameResponse, createGameType } from "@common/types";
import { createGame, removeLatestGame } from "@server/db/games";
import { formatRecentGame } from "@server/db/games/derivatives";

// export async function POST(req: Request) {
//   const json = await req.json();
//   const parsedCreateGameType = createGameType.parse(json);
//   const game = await createGame(parsedCreateGameType);
//   const jsonGame = formatRecentGame(game);
//   revalidatePath("/stats");

//   return NextResponse.json({
//     recentGame: jsonGame,
//     winner: game.winner,
//     loser: game.loser,
//   } as AddedGameResponse);
// }

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsedCreateGameType = createGameType.parse(json);
    const game = await createGame(parsedCreateGameType);
    const jsonGame = formatRecentGame(game);

    // const latestGame = await getLatestGame();
    // const [player1, player2] = await Promise.all([
    //   getPlayerInfo(latestGame.winnerId),
    //   getPlayerInfo(latestGame.loserId),
    // ]);

    revalidatePath("/stats");

    return NextResponse.json({
      recentGame: jsonGame,
      winner: game.winner,
      loser: game.loser,
      // winner: player1,
      // loser: player2,
    } as AddedGameResponse);
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json(
      { error: "Failed to retrieve data" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  const removedLatestGame = await removeLatestGame();
  return NextResponse.json(removedLatestGame);
}

export const dynamic = "force-dynamic";
