import { createPlayer, clearPlayersDEV } from '@common/db'
import { NewPlayer } from '@common/types'
import _ from 'lodash'

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

const randomEmojis: string[] = ['🥵', '😫', '🫥']

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
    elo: Math.random() * 1200,
  }
}

const createPlayers = async () => {
  const PLAYER_COUNT = 100
  const players = _.times(PLAYER_COUNT, generatePlayer)
  await Promise.all(players.map(createPlayer))
}

const main = async () => {
  await clearPlayersDEV()
  await createPlayers()
}

main()
