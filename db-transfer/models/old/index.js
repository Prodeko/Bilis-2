const { Game } = require("./raw/Game.js");
const { Player } = require("./raw/Player.js");

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

module.exports = { Player, Game };
