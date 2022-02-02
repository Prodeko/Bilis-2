import type {
  Player as ReturnPlayer,
  ValidationError,
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
  const players = await Player.findAll({
    attributes: ["id", "firstName", "lastName"],
  });
  redisConnection(async (client) =>
    Promise.all(
      players.map((p) => {
        const { firstName, lastName, id } = p;
        return client.hSet(`noderedis:players:${id}`, {
          firstName,
          lastName,
          nickName: "",
          id,
        });
      })
    )
  );
};

export { PlayerAPI, addPlayer, createSearchIndexForAll };
