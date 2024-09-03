import { NextResponse } from "next/server";

import { player } from "@common/types";
import { getRandomPlayer } from "@server/db/players";

export async function GET() {
  const randomPlayer = await getRandomPlayer().then((p) => p?.toJSON());
  const parsedPlayer = player.parse(randomPlayer);
  return NextResponse.json(parsedPlayer);
}

export const dynamic = "force-dynamic";
