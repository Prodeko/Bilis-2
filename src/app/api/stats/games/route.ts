import { type NextRequest, NextResponse } from "next/server";
import { Op } from "sequelize";
import { ZodError, z } from "zod";

import { GameModel, PlayerModel } from "@server/models";

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
      "winner",
      "loser",
      "time",
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
  filterWinnerName: z.string().optional(), // New filter for winner name
  filterLoserName: z.string().optional(), // New filter for loser name
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
      filterWinnerName,
      filterLoserName,
    } = querySchema.parse(queryParams);

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const where: any = {};

    if (filterId) where.id = filterId;

    if (filterWinnerEloMin || filterWinnerEloMax)
      where.winnerEloAfter = {
        [Op.between]: [
          filterWinnerEloMin || 0,
          filterWinnerEloMax || 1_000_000,
        ],
      };

    if (filterLoserEloMin || filterLoserEloMax)
      where.loserEloAfter = {
        [Op.between]: [filterLoserEloMin || 0, filterLoserEloMax || 1_000_000],
      };

    if (filterWinnerSeasonEloMin || filterWinnerSeasonEloMax)
      where.winnerSeasonEloAfter = {
        [Op.between]: [
          filterWinnerSeasonEloMin || 0,
          filterWinnerSeasonEloMax || 1_000_000,
        ],
      };

    if (filterLoserSeasonEloMin || filterLoserSeasonEloMax)
      where.loserSeasonEloAfter = {
        [Op.between]: [
          filterLoserSeasonEloMin || 0,
          filterLoserSeasonEloMax || 1_000_000,
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

    // Add filters for winner and loser names
    if (filterWinnerName) {
      where[Op.or] = [
        { "$winner.first_name$": { [Op.iLike]: `%${filterWinnerName}%` } },
        { "$winner.last_name$": { [Op.iLike]: `%${filterWinnerName}%` } },
      ];
    }

    if (filterLoserName) {
      where[Op.or] = [
        { "$loser.first_name$": { [Op.iLike]: `%${filterLoserName}%` } },
        { "$loser.last_name$": { [Op.iLike]: `%${filterLoserName}%` } },
      ];
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let order: any[] = [];
    if (sortBy === "winner" || sortBy === "loser") {
      order = [
        [
          { model: PlayerModel, as: sortBy },
          "first_name",
          sortDirection || "ASC",
        ],
        [
          { model: PlayerModel, as: sortBy },
          "last_name",
          sortDirection || "ASC",
        ],
      ];
    } else if (sortBy && sortBy !== "time") {
      order = [[sortBy, sortDirection || "DESC"]];
    }
    order.push(["createdAt", sortDirection || "DESC"]);

    const result = await GameModel.scope("withTime").findAndCountAll({
      where,
      limit,
      include: [
        { model: PlayerModel, as: "winner" },
        { model: PlayerModel, as: "loser" },
      ],
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
