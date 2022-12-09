const { connectToDbs, newSequelize } = require('./config/db.js')
const oldModels = require('./models/old/index.js')
const newModels = require('./models/new/index.js')

const logWithBase = (x, base) => Math.log(x) / Math.log(base)

const robustGameScore = gameCount => {
  return gameCount + 1 > 20 ? logWithBase(gameCount + 1, 1.14163) - 2.61648 : 20
}

const getScoreChange = (winnerElo, winnerGames, loserElo, loserGames) => {
  const winnerRobust = robustGameScore(winnerGames)
  const loserRobust = robustGameScore(loserGames)
  const winnerChange =
    630 *
    (1 - 1 / (1 + 2 ** ((loserElo - winnerElo) / 100))) *
    ((loserRobust - 1) / (winnerRobust * loserRobust))

  const loserChange =
    630 *
    (0 - 1 / (1 + 2 ** ((winnerElo - loserElo) / 100))) *
    ((winnerRobust - 1) / (loserRobust * winnerRobust))
  return [winnerChange, loserChange]
}

const updatePkSequences = () => {
  return Promise.all([
    newSequelize.query(
      "SELECT setval('games_id_seq', COALESCE((SELECT MAX(id)+1 FROM games), 1), false);"
    ),
    newSequelize.query(
      "SELECT setval('players_id_seq', COALESCE((SELECT MAX(id)+1 FROM players), 1), false);"
    ),
  ])
}

const DEFAULT_ELO = 400

const elos = {}
const gameCounts = {}

const formatNewGame = oldGame => {
  const winnerEloBefore = elos[oldGame.winnerId]
  const loserEloBefore = elos[oldGame.loserId]
  const winnerGameCount = gameCounts[oldGame.winnerId]
  const loserGameCount = gameCounts[oldGame.loserId]
  const [winnerEloDiff, loserEloDiff] = getScoreChange(
    winnerEloBefore,
    winnerGameCount,
    loserEloBefore,
    loserGameCount
  )
  const winnerEloAfter = winnerEloBefore + winnerEloDiff
  const loserEloAfter = loserEloBefore + loserEloDiff

  elos[oldGame.winnerId] = winnerEloAfter
  elos[oldGame.loserId] = loserEloAfter

  const g = {
    id: oldGame.id,
    winnerEloBefore,
    loserEloBefore,
    winnerEloAfter,
    loserEloAfter,
    winnerId: oldGame.winnerId,
    loserId: oldGame.loserId,
    underTable: oldGame.underTable,
    createdAt: oldGame.datetime,
  }

  return g
}

const formatNewPlayer = oldPlayer => {
  return {
    id: oldPlayer.id,
    firstName: oldPlayer.firstName,
    lastName: oldPlayer.lastName,
    elo: oldPlayer.fargo,
  }
}

const main = async () => {
  await connectToDbs()
  const oldPlayas = await oldModels.Player.findAll({})
  const oldGames = await oldModels.Game.findAll({
    order: [['datetime', 'ASC']],
  })

  oldPlayas.forEach(p => {
    elos[p.id] = DEFAULT_ELO
    gameCounts[p.id] = 0
  })

  const newPlayers = oldPlayas.map(formatNewPlayer)
  await newModels.Player.bulkCreate(newPlayers)

  const newGames = oldGames.map(oldGame => {
    const newGame = formatNewGame(oldGame)
    gameCounts[oldGame.winnerId] += 1
    gameCounts[oldGame.loserId] += 1
    return newGame
  })
  await newModels.Game.bulkCreate(newGames)
  await updatePkSequences()
}

main()
