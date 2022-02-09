type ValidationError = {
	field: string;
	message: string;
};

type PlayerMeta = {
	id: number;
	firstName: string;
	lastName: string;
	nickname: string;
};

type PlayerWithoutElo = PlayerMeta & {
	favoriteColor: string;
};

type Player = PlayerWithoutElo & {
	elo: number;
};

type PlayerWithStats = Player & {
	wonGames: number;
	lostGames: number;
	maxElo: number;
	minElo: number;
};

type GameMeta = {
	id: number;
	datetime: Date;
	underTable: boolean;
	winnerElo: number;
	loserElo: number;
};

type Game = GameMeta & {
	winner: Player;
	loser: Player;
};

type GameListItem = GameMeta & {
	winner: PlayerWithoutElo;
	loser: PlayerWithoutElo;
	winnerEloBefore: number;
	loserEloBefore: number;
};

export type {
	Player,
	Game,
	ValidationError,
	PlayerMeta,
	PlayerWithStats,
	PlayerWithoutElo,
	GameListItem,
};
