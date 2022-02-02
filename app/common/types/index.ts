type Player = {
  id: number;
  firstName: string;
  lastName: string;
  elo: number;
  favoriteColor: string;
  nickname: string;
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

export type { Player, Game, ValidationError };
