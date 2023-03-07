import _ from 'lodash'

import { CreateGameType, NewPlayer } from '@common/types'
import { DEFAULT_ELO } from '@common/utils/constants'
import { calculateNewGameEffects, createGame } from '@server/db/games'
import { clearGamesDEV } from '@server/db/games/derivatives'
import { clearPlayersDEV, createPlayer, getPlayers } from '@server/db/players'
import { PlayerModel } from '@server/models'
import Game from '@server/models/rawModels/Game'
import Player from '@server/models/rawModels/Player'

const randomFirstNames: string[] = [
  'Aada',
  'Aatos',
  'Aava',
  'Aino',
  'Eeli',
  'Eetu',
  'Eevi',
  'Eino',
  'Elias',
  'Ella',
  'Ellen',
  'Emil',
  'Helmi',
  'Hilla',
  'Isla',
  'Joel',
  'Leevi',
  'Leo',
  'Lilja',
  'Linnea',
  'Noel',
  'Oliver',
  'Olivia',
  'Onni',
  'Pihla',
  'Sofia',
  'Toivo',
  'Väinö',
  'Venla',
  'Vilho',
]

const randomLastNames: string[] = [
  'Korhonen',
  'Virtanen',
  'Mäkinen',
  'Nieminen',
  'Mäkelä',
  'Hämäläinen',
  'Laine',
  'Heikkinen',
  'Koskinen',
  'Järvinen',
]

const randomMottos: string[] = [
  'Alkoholiongelma on se, että ei ole alkoholia',
  'Sovitaanko että sinä olet vahtimestari ja minä maailmanmestari',
  'Poranssi on mun lempiväri',
  'Jos voittaa niin voittaa',
  'Raikku ist the way of life',
  'Juubelis',
  'Uuusko',
  'Raineri',
]

const randomEmojis: string[] = ['🥵', '😫', '🫥', '🫡', '🥶', '🤑', '👻', '💩', '🤡', '😸']

const generateNickname = (firstName: string, lastName: string) => {
  return (
    firstName.slice(0, Math.min(firstName.length, _.random(1, 4))) +
    lastName.slice(0, Math.min(lastName.length, _.random(1, 4))) +
    _.random(0, 99).toString()
  ).toLowerCase()
}

const generatePlayer = (): NewPlayer => {
  const { firstName, lastName } = {
    firstName: _.sample(randomFirstNames) as string,
    lastName: _.sample(randomLastNames) as string,
  }
  return {
    firstName,
    lastName,
    nickname: generateNickname(firstName, lastName),
    emoji: _.sample(randomEmojis) as string,
    elo: DEFAULT_ELO,
    motto: _.sample(randomMottos) as string,
  }
}

const createPlayers = async () => {
  const PLAYER_COUNT = 200
  const players = _.times(PLAYER_COUNT, generatePlayer)
  await Player.bulkCreate(players)
}

const createGames = async () => {
  // unix time one year ago
  const unix = Date.now() - 31536000000
  let i = 0
  const GAME_COUNT = 5000
  const allPlayers: Player[] = await getPlayers()
  const allPlayerData: { model: Player; gameCount: number }[] = allPlayers.map(p => {
    return { model: p, gameCount: 0 }
  })

  const games = _.times(GAME_COUNT, () => {
    const [winnerData, loserData] = _.sampleSize(allPlayerData, 2)

    const game = {
      winnerData,
      loserData,
      underTable: Math.random() < 0.1,
    }
    return game
  })

  const gamesToDB: { winnerId: number; loserId: number; underTable: boolean; createdAt: Date }[] =
    []
  //const gamesToDB: CreateGameType[] = []
  games.forEach(game => {
    const { winnerData, loserData, underTable } = game
    const effects = calculateNewGameEffects(
      { winnerId: winnerData.model.id, loserId: loserData.model.id, underTable },
      {
        winner: winnerData.model,
        loser: loserData.model,
        winnerGames: winnerData.gameCount,
        loserGames: loserData.gameCount,
      }
    )
    const { createdGameObject, winnerUpdateInfo, loserUpdateInfo } = effects

    winnerData.model.elo = winnerUpdateInfo.elo
    loserData.model.elo = loserUpdateInfo.elo

    winnerData.gameCount += 1
    loserData.gameCount += 1

    gamesToDB.push({ ...createdGameObject, createdAt: new Date(unix + i * 60000) })
    i += 1
  })

  const updatedPlayersToDB = allPlayerData.map(pd => {
    const model = pd.model
    return {
      id: model.id,
      firstName: model.firstName,
      lastName: model.lastName,
      nickname: model.nickname,
      emoji: model.emoji,
      motto: model.motto,
      elo: model.elo,
    }
  })
  console.log(updatedPlayersToDB)
  await clearPlayersDEV()
  //await Player.bulkCreate(updatedPlayersToDB)
  await Player.bulkCreate(updatedPlayersToDB, { updateOnDuplicate: ['elo'] })
  await Game.bulkCreate(gamesToDB, {
    include: [
      { model: PlayerModel, as: 'winner' },
      { model: PlayerModel, as: 'loser' },
    ],
  })
}

const main = async () => {
  await clearGamesDEV()
  await clearPlayersDEV()

  await createPlayers()
  await createGames()
}

main()
