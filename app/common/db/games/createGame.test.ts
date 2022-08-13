import { Player as PlayerType } from '@common/types'
import { Game } from '@server/models'
import { getScoreChange } from '@common/utils/gameStats'
import { createGame } from '@common/db/games'

const mockWinner: PlayerType = {
  id: 1,
  firstName: 'fname',
  lastName: 'lname',
  nickname: 'asd',
  emoji: '🥵',
  elo: 400,
}

const mockLoser: PlayerType = {
  id: 2,
  firstName: 'fname',
  lastName: 'lname',
  nickname: 'asd',
  emoji: '🥵',
  elo: 420,
}

const players = {
  [mockWinner.id]: mockWinner,
  [mockLoser.id]: mockLoser,
}

const winnerGames = 100
const loserGames = 50

jest.mock('@common/db/players', () => ({
  getPlayerById: jest.fn(async id => {
    return players[id]
  }),
}))

jest.mock('@server/models', () => ({
  Game: {
    create: jest.fn(),
    count: jest
      .fn()
      .mockImplementationOnce(async () => winnerGames)
      .mockImplementationOnce(async () => loserGames),
  },
}))

beforeEach(async () => {
  jest.clearAllMocks()
})

describe('create game', () => {
  test('calls Game.create with correct data', async () => {
    const newGame = {
      winnerId: mockWinner.id,
      loserId: mockLoser.id,
      underTable: false,
    }
    const [winnerEloChange, loserEloChange] = getScoreChange(
      mockWinner.elo,
      winnerGames,
      mockLoser.elo,
      loserGames
    )

    await createGame(newGame)
    expect(Game.create).toHaveBeenCalledTimes(1)
    expect(Game.create).toHaveBeenCalledWith({
      ...newGame,
      winnerEloAfter: mockWinner.elo + winnerEloChange,
      loserEloAfter: mockLoser.elo + loserEloChange,
      winnerEloBefore: mockWinner.elo,
      loserEloBefore: mockLoser.elo,
    })
  })
})
