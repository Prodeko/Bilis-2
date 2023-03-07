import _ from 'lodash'

import { CreateGameType, NewPlayer, NewSeason, Season } from '@common/types'
import { DEFAULT_ELO } from '@common/utils/constants'
import { calculateNewGameEffects, createGame } from '@server/db/games'
import { clearGamesDEV } from '@server/db/games/derivatives'
import { clearPlayersDEV, createPlayer, getPlayers } from '@server/db/players'
import { createSeason, getSeasons } from '@server/db/seasons'
import { clearSeasonsDEV } from '@server/db/seasons/derivatives'
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

const generatePlayer = (): NewPlayer & {
  elo: 400
} => {
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

const randomDateAfter = (day: Date, maxDays: number) => {
  const random = Math.floor(Math.random() * maxDays)
  return addDays(day, random)
}

const addDays = (date: Date, days: number) => {
  const daysSeconds = 1000 * 60 * 60 * 24
  return new Date(date.getTime() + daysSeconds * days)
}

const generateSeason = (n: number): NewSeason => {
  const start = addDays(new Date(), 30 * (n - 1))
  const end = randomDateAfter(start, 30)
  start.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)
  return {
    start,
    end,
  }
}

const createPlayers = async () => {
  const PLAYER_COUNT = 200
  const players = _.times(PLAYER_COUNT, generatePlayer)
  await Player.bulkCreate(players)
}

const createSeasons = async () => {
  const SEASON_COUNT = 10
  // generateSeason takes the iteration index as parameter
  const seasons = _.times(SEASON_COUNT, generateSeason)
  await Promise.all(seasons.map(createSeason))
}

const createGames = async () => {
  // unix time one year ago
  const unix = Date.now() - 31536000000
  let i = 0
  const GAME_COUNT = 5000
  const allPlayers: Player[] = await getPlayers()
  const seasons: Season[] = await getSeasons()
  const allPlayerData: { model: Player; gameCount: number }[] = allPlayers.map(p => {
    return { model: p, gameCount: 0 }
  })
  const seasonPlayerData: { [playerId: number]: { [seasonId: number]: number } } =
    Object.fromEntries(allPlayers.map(p => [p, Object.fromEntries(seasons.map(s => [s.id, 0]))]))

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
    const createdAt = new Date(unix + i * 60000)
    const season = seasons.find(s => s.start <= createdAt && createdAt < s.end)
    const effects = calculateNewGameEffects(
      { winnerId: winnerData.model.id, loserId: loserData.model.id, underTable },
      {
        winner: winnerData.model,
        loser: loserData.model,
        winnerGames: winnerData.gameCount,
        winnerSeasonGames: season ? seasonPlayerData[winnerData.model.id][season.id] : null,
        loserGames: loserData.gameCount,
        loserSeasonGames: season ? seasonPlayerData[loserData.model.id][season.id] : null,
        currentSeason: season ?? null,
      }
    )
    const { createdGameObject, winnerUpdateInfo, loserUpdateInfo } = effects

    winnerData.model.elo = winnerUpdateInfo.elo
    loserData.model.elo = loserUpdateInfo.elo

    winnerData.gameCount += 1
    loserData.gameCount += 1
    if (season) {
      seasonPlayerData[winnerData.model.id][season.id] += 1
      seasonPlayerData[loserData.model.id][season.id] += 1
    }

    gamesToDB.push({
      ...createdGameObject,
      underTable: createdGameObject.underTable ?? false,
      createdAt,
    })
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
  await clearSeasonsDEV()
  await createSeasons()
  await createPlayers()
  await createGames()
}

main()
