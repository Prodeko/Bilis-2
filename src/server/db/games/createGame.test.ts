/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Player as PlayerType } from "@common/types";
import { getScoreChange } from "@common/utils/gameStats";
import { createGame } from "@server/db/games";

const mockWinner: PlayerType = {
  id: 1,
  firstName: "fname",
  lastName: "lname",
  nickname: "asd",
  emoji: "🥵",
  elo: 400,
  seasonElo: null,
  latestSeasonId: null,
  motto: "jouh",
};

const mockLoser: PlayerType = {
  id: 2,
  firstName: "fname",
  lastName: "lname",
  nickname: "asd",
  emoji: "🥵",
  elo: 420,
  seasonElo: null,
  latestSeasonId: null,
  motto: "nice",
};

const players = {
  [mockWinner.id]: mockWinner,
  [mockLoser.id]: mockLoser,
};

const winnerGames = 100;
const loserGames = 50;

const mockUpdatePlayerById = jest.fn();

jest.mock("@server/db/players", () => ({
  getPlayerById: jest.fn((id) => {
    return players[id];
  }),
  updatePlayerById: (...a: any) => mockUpdatePlayerById(...a),
}));

jest.mock("@server/db/seasons", () => ({
  getCurrentSeason: jest.fn(() => null),
}));

const mockGameCount = jest.fn();
const mockCreate = jest.fn();

jest.mock("@server/models", () => ({
  GameModel: {
    scope: jest.fn((_scope) => ({
      create: jest.fn((data, _options) => mockCreate(data)),
    })),
    count: () => mockGameCount(),
  },
}));

beforeEach(async () => {
  jest.clearAllMocks();
});

describe("create game", () => {
  test("calls GameModel.create with correct data", async () => {
    const newGame = {
      winnerId: mockWinner.id,
      loserId: mockLoser.id,
      underTable: false,
    };
    const [winnerEloChange, loserEloChange] = getScoreChange(
      mockWinner.elo,
      winnerGames,
      mockLoser.elo,
      loserGames,
    );

    mockGameCount
      .mockImplementationOnce(async () => winnerGames)
      .mockImplementationOnce(async () => loserGames);

    await createGame(newGame);
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledWith({
      ...newGame,
      winnerEloAfter: mockWinner.elo + winnerEloChange,
      loserEloAfter: mockLoser.elo + loserEloChange,
      winnerEloBefore: mockWinner.elo,
      loserEloBefore: mockLoser.elo,
      winnerSeasonEloAfter: null,
      loserSeasonEloAfter: null,
      winnerSeasonEloBefore: null,
      loserSeasonEloBefore: null,
      seasonId: null,
    });
  });

  test("updates player elos", async () => {
    const newGame = {
      winnerId: mockWinner.id,
      loserId: mockLoser.id,
      underTable: false,
    };
    const [winnerEloChange, loserEloChange] = getScoreChange(
      mockWinner.elo,
      winnerGames,
      mockLoser.elo,
      loserGames,
    );
    mockGameCount
      .mockImplementationOnce(async () => winnerGames)
      .mockImplementationOnce(async () => loserGames);

    await createGame(newGame);
    expect(mockUpdatePlayerById).toHaveBeenCalledTimes(2);
    expect(mockUpdatePlayerById).toHaveBeenCalledWith(mockWinner.id, {
      elo: mockWinner.elo + winnerEloChange,
    });
    expect(mockUpdatePlayerById).toHaveBeenCalledWith(mockLoser.id, {
      elo: mockLoser.elo + loserEloChange,
    });
  });

  test("throws if player id's not given", async () => {
    // Game with missing winnerId
    const newGame = {
      loserId: mockLoser.id,
      underTable: false,
    };
    const f = () => createGame(newGame as any);
    await expect(f).rejects.toThrow();

    // Game with missing loserId
    const newGame2 = {
      winnerId: mockWinner.id,
      underTable: false,
    };
    const g = () => createGame(newGame2 as any);
    await expect(g).rejects.toThrow();
  });
});
