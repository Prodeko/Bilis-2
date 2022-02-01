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

export type {Player, ValidationError};
