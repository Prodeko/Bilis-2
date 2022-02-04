import type {
  Player as ReturnPlayer,
  ValidationError,
  PlayerMeta,
} from "../../common/types";
import { Player } from "../../server/models/index";
import { redisConnection } from "../../server/utils/redisConf";
import { checkSetupScript } from "../../server/utils/setupScriptHandler";

const playerAPI = {
  getById: (id: number): ReturnPlayer => {
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
  },
  searchByKeywords: (keywords: string): Promise<PlayerMeta[]> =>
    getPlayerMetasByString(keywords),
};

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
  const [players] = await Promise.all([
    Player.findAll({
      attributes: ["id", "firstName", "lastName"],
    }),
    redisConnection(async (client) => {
      const keys = await client.keys("nsearch:players:*");
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
        return client.hSet(`nsearch:players:${id}`, {
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

export {
  playerAPI,
  addPlayer,
  createSearchIndexForAll,
  getPlayerMetasByString,
};
