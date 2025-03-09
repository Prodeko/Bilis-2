import { Op, QueryTypes, Sequelize } from "sequelize";

import { type NewPlayer, type Player, newPlayer, player } from "@common/types";
import { permutator } from "@common/utils/helperFunctions";
import { PlayerModel } from "@server/models";
import dbConf from "@server/utils/dbConf";

import { getCurrentSeason } from "../seasons";

const createPlayer = async (player: NewPlayer): Promise<PlayerModel> => {
  const parsedPlayer = newPlayer.parse(player);
  const newPlayerWithElo = {
    ...parsedPlayer,
    elo: 400,
  };
  const createdPlayer = await PlayerModel.create(newPlayerWithElo);
  return createdPlayer;
};

const getPlayerById = async (id: number): Promise<PlayerModel | null> =>
  PlayerModel.findByPk(id);

const getRandomPlayer = (): Promise<PlayerModel | null> =>
  PlayerModel.findOne({
    order: dbConf.sequelize.random(),
    where: {
      motto: {
        [Op.ne]: "",
      },
    },
  });

const updatePlayerById = async (
  id: number,
  data: Partial<Player>,
): Promise<PlayerModel> => {
  const player = await getPlayerById(id);
  if (!player) throw Error(`Player with id ${id} not found`);
  if ("id" in data) throw Error("Updating player id is not allowed");
  const updated = await player.update(data);
  return updated;
};

//WARNING!! Only use in dev, destroys everything in database
const clearPlayersDEV = () =>
  PlayerModel.destroy({
    where: {},
    truncate: true,
    cascade: true,
  });

const getPlayers = async (
  amount?: number,
  seasonal?: boolean,
): Promise<PlayerModel[]> => {
  const season = seasonal ? await getCurrentSeason() : null;
  return PlayerModel.findAll({
    limit: amount,
    order: [[seasonal ? "seasonElo" : "elo", "DESC"]],
    where: seasonal
      ? {
          latestSeasonId: season?.id,
        }
      : undefined,
  });
};

const getLatestPlayers = async (
  nofPlayers: number,
  seasonal = false,
): Promise<Player[]> => {
  const response = (await dbConf.sequelize.query(
    `--sql
    WITH combined_players AS (
      SELECT 
        winner_id as player_id, 
        MAX(created_at) as last_game_time
      FROM games 
      GROUP BY winner_id

      UNION ALL

      SELECT 
        loser_id as player_id, 
        MAX(created_at) as last_game_time
      FROM games 
      GROUP BY loser_id
    ),

    recent_players AS (
      SELECT player_id, MAX(last_game_time) as last_game_played
      FROM combined_players
      GROUP BY player_id
      ORDER BY last_game_played DESC 
      LIMIT ${nofPlayers}
    )

    SELECT 
      players.id,
      players.first_name as "firstName", 
      players.last_name as "lastName", 
      players.nickname,
      players.emoji,
      players.motto,
      ${
        seasonal
          ? `
      CASE 
        WHEN players.season_elo IS NULL THEN 400
        WHEN players.season_elo <= 0 THEN 400
        ELSE players.season_elo
      END
      `
          : "players.elo"
      } as "elo",
      players.season_elo as "seasonElo",
      players.latest_season_id as "latestSeasonId"
    FROM recent_players
    JOIN players
    ON players.id = recent_players.player_id
  `,
    { type: QueryTypes.SELECT },
  )) as Player[];
  return player.array().parse(response);
};

const searchPlayers = async (
  query: string,
  limit?: number,
): Promise<PlayerModel[]> => {
  try {
    const colOptions = ["first_name", "last_name", "nickname", "id"];
    const permutations = permutator(colOptions);

    const queryParts = query.split(" ").filter((part) => part.length > 0);

    const options = await Promise.all(
      queryParts.map(async (part) => {
        return await Promise.all(
          permutations.map(async (perm) => {
            return Sequelize.where(
              Sequelize.fn("concat", ...perm.map((col) => Sequelize.col(col))),
              {
                [Op.iLike]: `${part}%`,
              },
            );
          }),
        );
      }),
    );

    const whereClause = {
      [Op.and]: options.map((opts) => ({ [Op.or]: opts })),
    };

    const players = await PlayerModel.findAll({
      where: whereClause,
      limit: limit,
    });

    return players;
  } catch (error) {
    console.error("Error in searchPlayers:", error);
    throw error;
  }
};

export {
  clearPlayersDEV,
  createPlayer,
  getLatestPlayers,
  getPlayerById,
  getPlayers,
  getRandomPlayer,
  searchPlayers,
  updatePlayerById,
};
