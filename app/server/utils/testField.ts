import { getLatestGames } from "../../common/db/games";
import {
  createSearchIndexForAll,
  getPlayerMetasByString,
} from "../../common/db/players";

const fn = async () => {
  const games = await getLatestGames();
  games.rows.forEach((el) => {
    console.log(el);
  });
};

fn();
