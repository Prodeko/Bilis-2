import { type NextRequest, NextResponse } from "next/server";
import { Op } from "sequelize";
import { ZodError, z } from "zod";

import { GameModel } from "@server/models";

// Assume GameModel corresponds to the new schema

type OrderDirection = "ASC" | "DESC";

const DEFAULT_GAME_LIMIT = 20;

const querySchema = z.object({
  limit: z.coerce.number().positive().default(DEFAULT_GAME_LIMIT),
  page: z.coerce.number().positive().default(1),
  sortBy: z
    .enum([
      "id",
      "winnerEloBefore",
      "loserEloBefore",
      "winnerEloAfter",
      "loserEloAfter",
      "underTable",
      "winnerSeasonEloBefore",
      "loserSeasonEloBefore",
      "winnerSeasonEloAfter",
      "loserSeasonEloAfter",
      "seasonId",
      "createdAt",
    ])
    .optional(),
  sortDirection: z.enum(["ASC", "DESC"]).optional(),
  filterId: z.coerce.number().optional(),
  filterWinnerEloMin: z.coerce.number().optional(),
  filterWinnerEloMax: z.coerce.number().optional(),
  filterLoserEloMin: z.coerce.number().optional(),
  filterLoserEloMax: z.coerce.number().optional(),
  filterWinnerSeasonEloMin: z.coerce.number().optional(),
  filterWinnerSeasonEloMax: z.coerce.number().optional(),
  filterLoserSeasonEloMin: z.coerce.number().optional(),
  filterLoserSeasonEloMax: z.coerce.number().optional(),
  filterSeasonId: z.coerce.number().optional(),
  filterCreatedAtMin: z.string().optional(), // assuming string representation of date/time
  filterCreatedAtMax: z.string().optional(),
  filterUnderTable: z.coerce.boolean().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const queryParams = Object.fromEntries(req.nextUrl.searchParams.entries());
    const {
      limit,
      page,
      sortBy,
      sortDirection,
      filterId,
      filterWinnerEloMin,
      filterWinnerEloMax,
      filterLoserEloMin,
      filterLoserEloMax,
      filterWinnerSeasonEloMin,
      filterWinnerSeasonEloMax,
      filterLoserSeasonEloMin,
      filterLoserSeasonEloMax,
      filterSeasonId,
      filterCreatedAtMin,
      filterCreatedAtMax,
      filterUnderTable,
    } = querySchema.parse(queryParams);

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const where: any = {};

    if (filterId) where.id = filterId;

    if (filterWinnerEloMin || filterWinnerEloMax)
      where.winnerEloBefore = {
        [Op.between]: [
          filterWinnerEloMin || 0,
          filterWinnerEloMax || Number.POSITIVE_INFINITY,
        ],
      };

    if (filterLoserEloMin || filterLoserEloMax)
      where.loserEloBefore = {
        [Op.between]: [
          filterLoserEloMin || 0,
          filterLoserEloMax || Number.POSITIVE_INFINITY,
        ],
      };

    if (filterWinnerSeasonEloMin || filterWinnerSeasonEloMax)
      where.winnerSeasonEloBefore = {
        [Op.between]: [
          filterWinnerSeasonEloMin || 0,
          filterWinnerSeasonEloMax || Number.POSITIVE_INFINITY,
        ],
      };

    if (filterLoserSeasonEloMin || filterLoserSeasonEloMax)
      where.loserSeasonEloBefore = {
        [Op.between]: [
          filterLoserSeasonEloMin || 0,
          filterLoserSeasonEloMax || Number.POSITIVE_INFINITY,
        ],
      };

    if (filterSeasonId) where.seasonId = filterSeasonId;

    if (filterCreatedAtMin || filterCreatedAtMax)
      where.createdAt = {
        [Op.between]: [
          filterCreatedAtMin || "1970-01-01T00:00:00Z", // Earliest possible date
          filterCreatedAtMax || new Date().toISOString(),
        ],
      };

    if (typeof filterUnderTable !== "undefined") {
      where.underTable = filterUnderTable;
    }

    const order: [string, OrderDirection][] = sortBy
      ? [[sortBy, sortDirection || "DESC"]]
      : [["createdAt", "DESC"]]; // Default sorting by createdAt DESC

    const result = await GameModel.findAndCountAll({
      where,
      limit,
      offset: limit * (page - 1),
      order,
    });

    return NextResponse.json({
      totalCount: result.count,
      pageCount: Math.ceil(result.count / limit),
      currentPage: page,
      games: result.rows,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: error.errors.map((e) => e.message).join(", "), error },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
        error,
      },
      { status: 500 },
    );
  }
}

export const dynamic = "force-dynamic";
