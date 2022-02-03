type Player = PlayerMeta & {
	elo: number;
	favoriteColor: string;
	favoriteBall: string;
	emoji: string;
};

type ValidationError = {
	field: string;
	message: string;
};

type Game = {
	id: number;
	winner: number;
	loser: number;
	datetime: Date;
	under_table: boolean;
	winner_elo: number;
	loser_elo: number;
};

type PlayerMeta = {
	id: number;
	firstName: string;
	lastName: string;
	nickname: string;
};

export type { Player, Game, ValidationError, PlayerMeta };
