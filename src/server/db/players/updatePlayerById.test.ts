/* eslint-disable @typescript-eslint/no-explicit-any */
import { updatePlayerById } from '.'

const mockDataForPlayer = {
  id: 1,
  firstName: 'fname',
  lastName: 'lname',
  nickname: 'nname',
  emoji: '🥵',
  motto: 'Pessimisti ei pety',
  elo: 9001,
}

const mockDataForPlayerUpdate = {
  firstName: 'fname2',
  lastName: 'lname2',
  nickname: 'nname2',
  emoji: '🥵2',
  motto: 'Pessimisti ei pety2',
}

const mockFindByPk = jest.fn((id: number) => {
  if (id !== 1) return null
  return {
    ...mockDataForPlayer,
    update: mockPlayerUpdate,
  }
})
const mockPlayerUpdate = jest.fn(data => {
  return {
    ...mockDataForPlayer,
    ...data,
  }
})
jest.mock('@server/models', () => ({
  PlayerModel: {
    findByPk: jest.fn(id => mockFindByPk(id)),
  },
}))

beforeEach(async () => {
  jest.clearAllMocks()
})
describe('update player by id', () => {
  test('throws if player not found by id', async () => {
    const f = () => updatePlayerById(2, { firstName: 'foo' })
    await expect(f).rejects.toThrow()
  })

  test('throws if request attempts to modify id', async () => {
    const f = () => updatePlayerById(1, { id: 2 } as any)
    await expect(f).rejects.toThrow()
  })

  test('calls player.update(data) correctly with valid data and returns updated player', async () => {
    const result = await updatePlayerById(1, mockDataForPlayerUpdate)
    expect(mockFindByPk).toHaveBeenCalledWith(1)
    expect(result).toStrictEqual({
      ...mockDataForPlayer,
      ...mockDataForPlayerUpdate,
    })
    expect(mockPlayerUpdate).toHaveBeenCalledWith(mockDataForPlayerUpdate)
  })
})
