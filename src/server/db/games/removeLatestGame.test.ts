/* eslint-disable @typescript-eslint/no-explicit-any */
import { removeLatestGame } from "@server/db/games";

const LATEST_GAME = {
  id: 1230,
  winnerId: 1,
  winnerEloBefore: 123,
  loserId: 2,
  loserEloBefore: 420,
};

const mockFindOne = jest.fn((..._a: any) => LATEST_GAME);

const mockDestroy = jest.fn();
const mockUpdatePlayerById = jest.fn();

jest.mock("@server/models", () => ({
  GameModel: {
    findOne: (...a: any) => mockFindOne(...a),
    destroy: (...a: any) => mockDestroy(...a),
  },
}));

jest.mock("@server/db/players", () => ({
  updatePlayerById: (...a: any) => mockUpdatePlayerById(...a),
}));

beforeEach(async () => {
  jest.clearAllMocks();
});

describe("remove latest game", () => {
  test("calls GameModel.findOne with correct orderBy", async () => {
    await removeLatestGame();

    expect(mockFindOne).toHaveBeenCalledWith({
      order: [["createdAt", "DESC"]],
    });
  });

  test("calls GameModel.destroy with correct id", async () => {
    await removeLatestGame();

    expect(mockDestroy).toHaveBeenCalledWith({
      where: {
        id: LATEST_GAME.id,
      },
    });
  });

  test("resets player elos to previous ones", async () => {
    await removeLatestGame();

    expect(mockUpdatePlayerById).toHaveBeenCalledTimes(2);
    expect(mockUpdatePlayerById).toHaveBeenCalledWith(LATEST_GAME.winnerId, {
      elo: LATEST_GAME.winnerEloBefore,
    });
    expect(mockUpdatePlayerById).toHaveBeenCalledWith(LATEST_GAME.loserId, {
      elo: LATEST_GAME.loserEloBefore,
    });
  });
});
