import { addPlayer } from "../../common/db/players";
import _ from "lodash";
import Player from "../models/Player";

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

const createTestPlayers = async () => {
  const promises: Promise<Player>[] = [];

  for (let i = 0; i < PLAYER_AMOUNT; i++) {
    promises.push(
      addPlayer(
        _.sample(randomFirstNames) || "",
        _.sample(randomLastNames) || "",
        0
      )
    );
  }

  const res = await Promise.all(promises);
  console.log(
    res.map((r) => r.id + ": " + r.firstName + " " + r.lastName).join("\n")
  );
  console.log(res.length + " players created");
};

createTestPlayers();
