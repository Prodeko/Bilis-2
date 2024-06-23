import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { newPlayer, player } from "@common/types";
import { createPlayer, searchPlayers } from "@server/db/players";

export async function GET(req: NextRequest) {
  const limit = 20;

  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");
  const searchString = z.string().parse(query);

  const players = await searchPlayers(searchString, limit).then((players) =>
    players.map((player) => player.toJSON()),
  );
  const parsedPlayers = player.array().parse(players);
  return NextResponse.json(parsedPlayers);
}

export async function POST(req: NextRequest) {
  const playerData = await req.json();
  const parsedNewPlayer = newPlayer.parse(playerData);
  const createdPlayer = await createPlayer(parsedNewPlayer);
  return NextResponse.json(createdPlayer);
}

export const dynamic = "force-dynamic";
