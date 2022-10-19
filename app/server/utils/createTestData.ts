import _ from 'lodash'

import { NewPlayer, PlayerExtended } from '@common/types'
import { clearGamesDEV, createGame } from '@server/db/games'
import { clearPlayersDEV, createPlayer, getPlayers } from '@server/db/players'
import { DEFAULT_ELO } from '@common/utils/constants'

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

const randomEmojis: string[] = ['🥵', '😫', '🫥', '🫡', '🥶', '🤑', '👻', '💩', '🤡', '😸']

const generateNickname = (firstName: String, lastName: String) => {
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
    motto: 'Raikku is the way of life',
  }
}

const createPlayers = async () => {
  const PLAYER_COUNT = 200
  const players = _.times(PLAYER_COUNT, generatePlayer)
  await Promise.all(players.map(createPlayer))
}

const createGames = async () => {
  const GAME_COUNT = 20000
  const allPlayers = await getPlayers()

  for (let idx = 0; idx < GAME_COUNT; idx++) {
    const winner = _.sample(allPlayers) as PlayerExtended
    const loser = _.sample(allPlayers) as PlayerExtended
    const game = {
      winnerId: winner.id,
      loserId: loser.id,
      underTable: Math.random() < 0.1,
    }
    await createGame(game)
  }
}

const main = async () => {
  await clearGamesDEV()
  await clearPlayersDEV()
  await createPlayers()
  await createGames()
}

main()
