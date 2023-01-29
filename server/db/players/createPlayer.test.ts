/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPlayer } from "@common/types";
import { createPlayer } from "@server/db/players";

const mockDataForPlayer : NewPlayer = {
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
        create: jest.fn((...args) => mockCreatePlayer(...args))
    }
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
            const f = () => createPlayer({ 
                lastName: 'lname',
                nickname: 'nname',
                emoji: '🥵',
                motto: 'Pessimisti ei pety',
             } as any)
            await expect(f).rejects.toThrow()
        })
        test('throws with missing lastName', async () => {
            const f = () => createPlayer({ 
                firstName: 'fname',
                nickname: 'nname',
                emoji: '🥵',
                motto: 'Pessimisti ei pety',
             } as any)
            await expect(f).rejects.toThrow()
        })
        test('throws with missing nickName', async () => {
            const f = () => createPlayer({ 
                firstName: 'fname',
                lastName: 'lname',
                emoji: '🥵',
                motto: 'Pessimisti ei pety',
             } as any)
            await expect(f).rejects.toThrow()
        })
        test('throws with missing emoji', async () => {
            const f = () => createPlayer({ 
                firstName: 'fname',
                lastName: 'lname',
                nickname: 'nname',
                motto: 'Pessimisti ei pety',
             } as any)
            await expect(f).rejects.toThrow()
        })
        test('throws with missing motto', async () => {
            const f = () => createPlayer({ 
                firstName: 'fname',
                lastName: 'lname',
                nickname: 'nname',
                emoji: '🥵',
             } as any)
            await expect(f).rejects.toThrow()
        })
    })
})