import type {
	Player as ReturnPlayer,
	ValidationError,
	PlayerMeta,
} from "../../common/types";
import Player from "../../server/models/Player";
import { redisConnection } from "../../server/utils/redisConf";

class PlayerAPI {
	constructor() {}
	get(id: number): ReturnPlayer {
		return {
			id: id,
			firstName: `User`,
			lastName: "na",
			elo: 0,
			favoriteColor: "na",
			favoriteBall: "na",
			nickname: "na",
			emoji: "na",
		};
	}
}

const addPlayer = async (
	firstName: string,
	lastName: string,
	favoriteColor: number,
	elo: number = 400
) => {
	const res = await Player.create({
		firstName,
		lastName,
		favoriteColor,
		elo,
	});
	return res;
};

const createSearchIndexForAll = async () => {
	const [players, ac] = await Promise.all([
		Player.findAll({
			attributes: ["id", "firstName", "lastName"],
		}),
		redisConnection((client) => client.del("nsearch:ac")),
	]);
	await redisConnection(async (client) =>
		Promise.all(
			players.map((p) => {
				const { firstName, lastName, id } = p;
				const nickname = "";
				const updatedAt = Date.now();
				return Promise.all([
					client.hSet(`nsearch:players:${id}`, {
						firstName,
						lastName,
						nickname,
						id,
						updatedAt,
					}),
					client.ft.sugAdd("nsearch:ac", firstName, 3, {
						INCR: true,
					}),
					client.ft.sugAdd("nsearch:ac", lastName, 2, {
						INCR: true,
					}),
					nickname
						? client.ft.sugAdd("nsearch:ac", nickname, 1, {
								INCR: true,
						  })
						: Promise.resolve(),
				]);
			})
		)
	);
};

const getPlayerMetasByString = async (
	str: string,
	page: number = 0,
	pageSize: number = 20
) =>
	redisConnection(async (client) => {
		const d = Date.now();
		const ac = await client.ft.sugGet("nsearch:ac", str);
		if (!ac || ac.length === 0) {
			return [];
		}
		const res = (await client.sendCommand([
			"FT.SEARCH",
			"idx:nsearch",
			ac.join("|"),
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
		console.log("Time: " + (Date.now() - d));
		return results;
	});

export {
	PlayerAPI,
	addPlayer,
	createSearchIndexForAll,
	getPlayerMetasByString,
};
