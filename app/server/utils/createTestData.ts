import { addPlayer } from "../../common/db/players";
import _ from "lodash";
import { Player, Game } from "../models";
import { addGame, devClearGames } from "../../common/db/games";
import { Player as ResultPlayer } from "../../common/types";

const PLAYER_AMOUNT = isNaN(Number(process.argv[2]))
	? 20
	: Number(process.argv[2]);
const GAME_AMOUNT = isNaN(Number(process.argv[3]))
	? 30
	: Number(process.argv[3]);

const randomFirstNames = [
	"Aada",
	"Aatos",
	"Aava",
	"Aino",
	"Eeli",
	"Eetu",
	"Eevi",
	"Eino",
	"Elias",
	"Ella",
	"Ellen",
	"Emil",
	"Helmi",
	"Hilla",
	"Isla",
	"Joel",
	"Leevi",
	"Leo",
	"Lilja",
	"Linnea",
	"Noel",
	"Oliver",
	"Olivia",
	"Onni",
	"Pihla",
	"Sofia",
	"Toivo",
	"Väinö",
	"Venla",
	"Vilho",
];

const randomLastNames = [
	"Korhonen",
	"Virtanen",
	"Mäkinen",
	"Nieminen",
	"Mäkelä",
	"Hämäläinen",
	"Laine",
	"Heikkinen",
	"Koskinen",
	"Järvinen",
];

const generateNickname = (firstName: String, lastName: String) => {
	return (
		firstName.slice(0, Math.min(firstName.length, _.random(1, 4)))
		+ lastName.slice(0, Math.min(lastName.length, _.random(1, 4)))
		+ _.random(0, 99).toString()
	).toLowerCase();
};

const createTestPlayers = async () => {
	const promises: Promise<ResultPlayer>[] = [];

	await devClearGames();

	for (let i = 0; i < PLAYER_AMOUNT; i++) {
		const firstName = _.sample(randomFirstNames) || "";
		const lastName = _.sample(randomLastNames) || "";
		promises.push(
			addPlayer(
				firstName,
				lastName,
				generateNickname(firstName, lastName) || "",
				'#' + _.random(0, 16777215).toString(16).padStart(6, '0') || '#000000',
			)
		);
	}

	const res = await Promise.all(promises);
	console.log(
		res.map((r) => r.id + ": " + r.firstName + " '" + r.nickname + "' " + r.lastName).join("\n")
	);
	console.log(res.length + " players created");

	const players = await Player.findAll();

	if (players.length > 0) {
		const games: Game[] = [];
		for (let i = 0; i < GAME_AMOUNT; i++) {
			games.push(
				await addGame(
					_.sample(players)?.id as number,
					_.sample(players)?.id as number,
					Math.random() < 0.05
				)
			);
		}
		console.log(games.length + " games created");
	}
};

console.log("Creating test players");

createTestPlayers();
