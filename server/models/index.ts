import _Game from './rawModels/Game'
import Player from './rawModels/Player'

class Game extends _Game {
  declare winner?: Player

  declare loser?: Player

  declare winnerId: number

  declare loserId: number
}

// Define winnerId foreign key GameModel -> Player
Player.hasMany(Game, {
  as: 'wonGames',
  foreignKey: 'winnerId',
})

// Define loserId foreign key Game -> Player
Player.hasMany(Game, {
  as: 'lostGames',
  foreignKey: 'loserId',
})

// Define winnerId foreign key Game -> Player
Game.belongsTo(Player, {
  foreignKey: 'winnerId',
  as: 'winner',
})
// Define loserId foreign key Game -> Player
Game.belongsTo(Player, {
  foreignKey: 'loserId',
  as: 'loser',
})

export { Player as PlayerModel, Game as GameModel }
