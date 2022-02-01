import Player from "./Player";
import Game from "./Game";

// Define winnerId foreign key Game -> Player
Player.hasMany(Game, {
    foreignKey: "winnerId"
})
// Define loserId foreign key Game -> Player
Player.hasMany(Game, {
    foreignKey: "loserId"
})

// Define winnerId foreign key Game -> Player
Game.belongsTo(Player, {
    foreignKey: "wonGames"
})
// Define loserId foreign key Game -> Player
Game.belongsTo(Player, {
    foreignKey: "lostGames"
})