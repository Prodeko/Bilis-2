import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { newSeason } from "@common/types";
import { createSeason } from "@server/db/seasons";

export async function POST(req: NextRequest) {
  try {
    const seasonData = await req.json();
    const parsedNewSeason = newSeason.parse(seasonData);
    const createdPlayer = await createSeason(parsedNewSeason);
    return NextResponse.json(createdPlayer);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: error.errors.map((e) => e.message).join(", "), error },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        message: error?.message,
        error,
      },
      { status: 500 },
    );
  }
}

export const dynamic = "force-dynamic";
