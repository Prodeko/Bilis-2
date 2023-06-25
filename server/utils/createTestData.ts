import _ from 'lodash'

import { NewPlayer, NewSeason, Player } from '@common/types'
import { DEFAULT_ELO } from '@common/utils/constants'
import { createGame } from '@server/db/games'
import { clearGamesDEV } from '@server/db/games/derivatives'
import { clearPlayersDEV, createPlayer, getPlayers } from '@server/db/players'
import { createSeason } from '@server/db/seasons'
import { clearSeasonsDEV } from '@server/db/seasons/derivatives'

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
  await Promise.all(players.map(createPlayer))
}

const createSeasons = async () => {
  const SEASON_COUNT = 10
  const seasons = _.times(SEASON_COUNT, generateSeason)
  await Promise.all(seasons.map(createSeason))
}

const createGames = async () => {
  const GAME_COUNT = 20000
  const allPlayers = await getPlayers()

  const games = _.times(GAME_COUNT, () => {
    const winner = _.sample(allPlayers) as Player
    const remainingPlayers = allPlayers.filter(player => player.id !== winner.id)

    const loser = _.sample(remainingPlayers) as Player
    const game = {
      winnerId: winner.id,
      loserId: loser.id,
      underTable: Math.random() < 0.1,
    }
    return game
  })

  for await (const game of games) {
    await createGame(game)
  }
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
