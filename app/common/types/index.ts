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

type Player = PlayerMeta & {
	elo: number;
	favoriteColor: string;
};

type PlayerWithStats = Player & {
	wonGames: number;
	lostGames: number;
	maxElo: number;
	minElo: number;
};

type Game = {
	id: number;
	winner: Player;
	loser: Player;
	datetime: Date;
	underTable: boolean;
	winnerElo: number;
	loserElo: number;
};

export type { Player, Game, ValidationError, PlayerMeta, PlayerWithStats };
