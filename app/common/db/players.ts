import type {
  Player as ReturnPlayer,
  ValidationError,
} from "../../common/types";
import Player from "../../server/models/Player";

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

export { PlayerAPI, addPlayer };
