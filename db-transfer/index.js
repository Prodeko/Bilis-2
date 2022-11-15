import { connectToDb } from "./config/db.js";
import { Game, Player } from "./models/new/index.js";

const main = async () => {
  await connectToDb();
  const players = await Player.findAll({});
  const games = await Game.findAll({});
  games.forEach(console.log);
};

main();
