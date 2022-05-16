import { Player } from '../types'
import { playerAPI } from '../db/players'

const testPlayers = [
  {
    firstName: 'Teemu',
    lastName: 'Teekkari',
    favoriteColor: '#21aaaf',
  },
  {
    firstName: 'Teuvo',
    lastName: 'Teekkari',
    favoriteColor: '#ffffff',
  },
  {
    firstName: 'Tove',
    lastName: 'Tutalainen',
    favoriteColor: '#ffaa00',
  },
]

describe('Database', () => {
  let testPlayer1: Player
  const [rawTestPlayer1, ...rawOtherTestPlayers] = testPlayers
  it('should create player', async () => {
    testPlayer1 = await playerAPI.addPlayer(
      rawTestPlayer1.firstName,
      rawTestPlayer1.lastName,
      '',
      rawTestPlayer1.favoriteColor
    )
    expect(testPlayer1).toMatchObject(rawTestPlayer1)
  })

  it('should query player by id', async () => {
    const res = await playerAPI.getById(testPlayer1.id)

    expect(res).toMatchObject(testPlayer1)
  })

  it('should query full player stats', async () => {
    const res = await playerAPI.getPlayerStatsById(testPlayer1.id)

    expect(res).toMatchObject({
      ...testPlayer1,
      wonGames: 0,
      lostGames: 0,
      maxElo: testPlayer1.elo,
      minElo: testPlayer1.elo,
    })
  })

  let testPlayer2: Player
  let testPlayer3: Player

  it('should create more players', async () => {
    const createPlayer = async (p: {
      firstName: string
      lastName: string
      favoriteColor: string
    }) => playerAPI.addPlayer(p.firstName, p.lastName, '', p.favoriteColor)

    testPlayer2 = await createPlayer(testPlayers[1])
    testPlayer3 = await createPlayer(testPlayers[2])

    console.log(testPlayer2)

    expect(testPlayer2).toMatchObject(testPlayers[1])
    expect(testPlayer3).toMatchObject(testPlayers[2])
  })

  /*
	it("should return object in reversed adding order", async () => {
		const res = await playerAPI.searchByKeywords("");

		expect(res).toMatchObject(
			[testPlayer3, testPlayer2, testPlayer1].map((p) => ({
				id: p.id,
				firstName: p.firstName,
				lastName: p.lastName,
				nickname: p.nickname,
			}))
		);
	});
  */
})
