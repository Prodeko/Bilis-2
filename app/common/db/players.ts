import type {
	Player as ReturnPlayer,
	ValidationError,
	PlayerMeta,
	PlayerWithStats,
} from "../../common/types";
import { Player, Game } from "../../server/models/index";
import { redisConnection } from "../../server/utils/redisConf";
import { checkSetupScript } from "../../server/utils/setupScriptHandler";
import { hexToInt, intToHex } from "../utils/colorConvert";
import redisKeys from "../utils/redisKeys";

const DEFAULT_LEADERBOARD_SIZE = 20;

const mapPlayerToReturnPlayer = (player: Player): ReturnPlayer => {
	const { id, firstName, lastName, favoriteColor, elo } = player;
	return {
		id,
		firstName,
		lastName,
		nickname: "",
		favoriteColor: intToHex(favoriteColor),
		elo,
	};
};

const addPlayer = async (
	firstName: string,
	lastName: string,
	favoriteColor: string,
	elo: number = 400
) => {
	const res = await Player.create({
		firstName,
		lastName,
		favoriteColor: hexToInt(favoriteColor),
		elo,
	});
	if (!res) throw new Error("Creating player failed");
	await redisConnection(async (client) => {
		return client.hSet(`${redisKeys.playerSearch}:${res.id}`, {
			firstName: res.firstName,
			lastName: res.lastName,
			nickname: "",
			id: res.id,
			updatedAt: Date.now(),
		});
	});
	return mapPlayerToReturnPlayer(res);
};

const createSearchIndexForAll = async () => {
	const [players] = await Promise.all([
		Player.findAll({
			attributes: ["id", "firstName", "lastName"],
		}),
		redisConnection(async (client) => {
			const keys = await client.keys(`${redisKeys.playerSearch}:*`);
			if (keys.length === 0) return;
			return client.del(keys);
		}),
	]);
	await redisConnection(async (client) =>
		Promise.all(
			players.map((p) => {
				const { firstName, lastName, id } = p;
				const nickname = "";
				const updatedAt = Date.now();
				return client.hSet(`${redisKeys.playerSearch}:${id}`, {
					firstName,
					lastName,
					nickname,
					id,
					updatedAt,
				});
			})
		)
	);
};

checkSetupScript("createSearchIndexForAll-0.1", createSearchIndexForAll);

const getPlayerMetasByString = async (
	str: string,
	page: number = 0,
	pageSize: number = 20
) =>
	redisConnection(async (client) => {
		const d = Date.now();
		const terms =
			str
				.split(" ")
				.map((a) => (a.length === 0 ? "" : `${a}*`))
				.filter((s) => s.length > 0)
				.join(" ") || "*";
		const res = (await client.sendCommand([
			"FT.SEARCH",
			"idx:nsearch",
			terms,
			"SORTBY",
			"updatedAt",
			"DESC",
			"LIMIT",
			String(page * pageSize),
			String(pageSize),
		])) as (number | string | string[])[];

		const results: PlayerMeta[] = res
			.filter((a: any) => typeof a !== "number" && typeof a !== "string")
			.map((_row) => {
				const row = _row as string[];
				const r: PlayerMeta = {
					firstName: "",
					lastName: "",
					nickname: "",
					id: -1,
				};

				for (let i = 0; i < row.length - 1; i += 2) {
					const key = row[i];
					const value = row[i + 1];
					if (key === "id") {
						r.id = Number(value);
					} else if (key === "firstName") {
						r.firstName = value;
					} else if (key === "lastName") {
						r.lastName = value;
					} else if (key === "nickname") {
						r.nickname = value;
					}
				}

				return r;
			});
		console.log("Searchtime: " + (Date.now() - d) + " ms");
		return results;
	});

const getPlayerStatsById = async (id: number): Promise<PlayerWithStats> => {
	const [player, wonGames, lostGames, maxElo, minElo] = await Promise.all([
		Player.findByPk(id),
		Game.count({
			where: {
				winnerId: id,
			},
		}),
		Game.count({
			where: {
				loserId: id,
			},
		}),
		Game.max("winnerElo", {
			where: {
				winnerId: id,
			},
		}),
		Game.min("loserElo", {
			where: {
				loserId: id,
			},
		}),
	]);

	const { firstName, lastName, elo, favoriteColor } = player as Player;

	return {
		id,
		firstName,
		lastName,
		nickname: "",
		elo,
		favoriteColor: intToHex(favoriteColor),
		wonGames,
		lostGames,
		maxElo: Math.max(Number(maxElo) || 400, 400),
		minElo: Math.min(Number(minElo) || 400, 400),
	};
};

const getTopPlayers = async (
	page: number = 0,
	pageSize: number = DEFAULT_LEADERBOARD_SIZE
): Promise<ReturnPlayer[]> => {
	if (page === 0 && pageSize === DEFAULT_LEADERBOARD_SIZE) {
		const redisRes = await redisConnection(async (client) => {
			if (await client.exists(redisKeys.leaderboardCache)) {
				return (
					await client.lRange(
						redisKeys.leaderboardCache,
						0,
						DEFAULT_LEADERBOARD_SIZE - 1
					)
				).map((r: string): ReturnPlayer => JSON.parse(r));
			} else {
				return false;
			}
		});
		if (redisRes) {
			return redisRes;
		}
	}

	const res = (
		await Player.findAll({
			order: [
				["elo", "DESC"],
				["updatedAt", "DESC"],
			],
			limit: pageSize,
			offset: page * pageSize,
		})
	).map((r) => r.getPlayerType());

	if (page === 0 && pageSize >= DEFAULT_LEADERBOARD_SIZE) {
		redisConnection(async (client) => {
			await client.del(redisKeys.leaderboardCache);
			await client.rPush(
				redisKeys.leaderboardCache,
				res.slice(0, DEFAULT_LEADERBOARD_SIZE).map((r) => JSON.stringify(r))
			);
			if (res.length < DEFAULT_LEADERBOARD_SIZE) {
				await client.set(redisKeys.leaderboardElo, 0);
			} else {
				await client.set(
					redisKeys.leaderboardElo,
					res[DEFAULT_LEADERBOARD_SIZE - 1].elo
				);
			}
		});
	}

	return res;
};

const playerAPI = {
	addPlayer,
	getById: async (id: number): Promise<ReturnPlayer> =>
		mapPlayerToReturnPlayer((await Player.findByPk(id)) as Player),
	searchByKeywords: (keywords: string): Promise<PlayerMeta[]> =>
		getPlayerMetasByString(keywords),
	getPlayerStatsById,
	getTopPlayers,
};

export {
	playerAPI,
	addPlayer,
	createSearchIndexForAll,
	getPlayerMetasByString,
};
