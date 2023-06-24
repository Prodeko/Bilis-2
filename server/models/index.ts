import _Game from './rawModels/Game'
import Player from './rawModels/Player'
import Season from './rawModels/Season'

class Game extends _Game {
  declare winner?: Player

  declare loser?: Player

  declare season?: Season

  declare winnerId: number

  declare loserId: number
}

// Define winnerId foreign key Game -> Player
Player.hasMany(Game, {
  as: 'wonGames',
  foreignKey: 'winnerId',
})

// Define loserId foreign key Game -> Player
Player.hasMany(Game, {
  as: 'lostGames',
  foreignKey: 'loserId',
})

// Define seasonid foreign key Game -> Player
Season.hasMany(Game, {
  as: 'games',
  foreignKey: 'seasonId',
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

// Define loserId foreign key Game -> Player
Player.belongsTo(Season, {
  foreignKey: 'latestSeasonId',
  as: 'Season',
})

// Define seasonId foreign key Game -> Player
Game.belongsTo(Season, {
  foreignKey: 'seasonId',
  as: 'season',
})

export { Player as PlayerModel, Game as GameModel, Season as SeasonModel }
