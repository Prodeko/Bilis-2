/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPlayer } from '@common/types'
import { createPlayer } from '@server/db/players'

const mockDataForPlayer: NewPlayer = {
  firstName: 'fname',
  lastName: 'lname',
  nickname: 'nname',
  emoji: '🥵',
  motto: 'Pessimisti ei pety',
  elo: 9001,
}

const mockCreatePlayer = jest.fn()
jest.mock('@server/models', () => ({
  PlayerModel: {
    create: jest.fn((...args) => mockCreatePlayer(...args)),
  },
}))

beforeEach(async () => {
  jest.clearAllMocks()
})
describe('create player', () => {
  test('calls PlayerModel.create with correct data', async () => {
    await createPlayer(mockDataForPlayer)
    expect(mockCreatePlayer).toHaveBeenCalledTimes(1)
    expect(mockCreatePlayer).toHaveBeenCalledWith({
      ...mockDataForPlayer,
      elo: 400,
    })
  })

  describe('throws with bad data', () => {
    test('throws with missing firstName', async () => {
      const f = () => {
        const { firstName: _, ...mockData } = mockDataForPlayer
        return createPlayer(mockData as any)
      }
      await expect(f).rejects.toThrow()
    })
    test('throws with missing lastName', async () => {
      const f = () => {
        const { lastName: _, ...mockData } = mockDataForPlayer
        return createPlayer(mockData as any)
      }
      await expect(f).rejects.toThrow()
    })
    test('throws with missing nickname', async () => {
      const f = () => {
        const { nickname: _, ...mockData } = mockDataForPlayer
        return createPlayer(mockData as any)
      }
      await expect(f).rejects.toThrow()
    })
    test('throws with missing emoji', async () => {
      const f = () => {
        const { emoji: _, ...mockData } = mockDataForPlayer
        return createPlayer(mockData as any)
      }
      await expect(f).rejects.toThrow()
    })
    test('throws with missing motto', async () => {
      const f = () => {
        const { motto: _, ...mockData } = mockDataForPlayer
        return createPlayer(mockData as any)
      }
      await expect(f).rejects.toThrow()
    })
  })
})
