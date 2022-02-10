import { Game, Player } from "../../../server/models";
import { PlayerMeta } from "../../types";
import { intToHex } from "../../utils/colorConvert";
import { DEFAULT_ELO } from "../../utils/constants";

const createPlayer = async (player: any) => {
    const createdPlayer = await Player.create(player);
	if (!createdPlayer) throw new Error("Creating player failed");
    return createdPlayer
}

const getPlayers = async () => {
    return Player.findAll({
        attributes: ["id", "firstName", "lastName"],
    })
}

const getPlayerMetas = (metaSearchResults: (number | string | string[])[]) => {
    return metaSearchResults
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
}

const getPlayerStats = async (playerId: number) => {
    const [player, wonGames, lostGames, maxElo, minElo] = await Promise.all([
		Player.findByPk(playerId),
		Game.count({
			where: { winnerId: playerId },
		}),
		Game.count({
			where: { loserId: playerId },
		}),
		Game.max("winnerElo", {
			where: { winnerId: playerId },
		}),
		Game.min("loserElo", {
			where: { loserId: playerId }
        }),
	]);

	const { firstName, lastName, elo, favoriteColor } = player as Player;

	return {
		id: playerId,
		firstName,
		lastName,
		nickname: "",
		elo,
		favoriteColor: intToHex(favoriteColor),
		wonGames,
		lostGames,
		maxElo: Math.max(Number(maxElo) || DEFAULT_ELO, DEFAULT_ELO),
		minElo: Math.min(Number(minElo) || DEFAULT_ELO, DEFAULT_ELO),
	};
}

const getTopPlayersDb = async (page: number, pageSize: number) => {
    return (
		await Player.findAll({
			order: [
				["elo", "DESC"],
				["updatedAt", "DESC"],
			],
			limit: pageSize,
			offset: page * pageSize,
		})
	).map((r) => r.getPlayerType());
}

export {
    createPlayer,
    getPlayers,
    getPlayerMetas,
    getPlayerStats,
    getTopPlayersDb
}