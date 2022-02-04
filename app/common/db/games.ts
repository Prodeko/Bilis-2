import { Player, Game } from "../../server/models/index";

const addGame = async (winner: Player, loser: Player, underTable: boolean) => {
  const res = await Game.create({
    winnerId: winner.id,
    loserId: loser.id,
    winnerElo: winner.elo,
    loserElo: loser.elo,
    underTable,
  });
  return res;
};

const getLatestGames = async (page: number = 0, pageSize: number = 20) => {
  const res = await Game.findAndCountAll({
    order: [["createdAt", "DESC"]],
    limit: pageSize,
    offset: page * pageSize,
    include: [{ model: Player }],
  });
  console.log(res);
  return res;
};

export { addGame, getLatestGames };
