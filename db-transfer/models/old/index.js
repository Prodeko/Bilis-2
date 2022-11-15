import Game from "./raw/Game.js";
import Player from "./raw/Player.js";

// Define winnerId foreign key Game -> Player
Player.hasMany(Game, {
  as: "wonGames",
  foreignKey: "winnerId",
});

// Define loserId foreign key Game -> Player
Player.hasMany(Game, {
  as: "lostGames",
  foreignKey: "loserId",
});

// Define winnerId foreign key Game -> Player
Game.belongsTo(Player, {
  foreignKey: "winnerId",
  as: "winner",
});
// Define loserId foreign key Game -> Player
Game.belongsTo(Player, {
  foreignKey: "loserId",
  as: "loser",
});

export { Player, Game };
