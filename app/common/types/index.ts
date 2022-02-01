type Player = {
    id: number
    first_name: string
    last_name: string
    elo: number
    fav_color: string
    nickname: string
    fav_ball: string
    emoji: string
}

type ValidationError = {
    field: string
    message: string
}

type Game = {
  id: number
  winner: number
  loser: number
  datetime: Date
  under_table: boolean
  winner_elo: number
  loser_elo: number
}

export type {Player, Game, ValidationError};

