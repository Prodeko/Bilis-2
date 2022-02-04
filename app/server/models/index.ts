import Player from "./rawModels/Player";
import Game from "./rawModels/Game";

// Define winnerId foreign key Game -> Player
Player.hasMany(Game, {
  foreignKey: "winnerId",
});
// Define loserId foreign key Game -> Player
Player.hasMany(Game, {
  foreignKey: "loserId",
});

// Define winnerId foreign key Game -> Player
Game.belongsTo(Player, {
  foreignKey: "id",
  as: "winnerId",
});
// Define loserId foreign key Game -> Player
Game.belongsTo(Player, {
  foreignKey: "id",
  as: "loserId",
});

export { Player, Game };
