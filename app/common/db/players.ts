import type { Player, ValidationError } from '../../common/types'


class PlayerAPI {
    constructor() {
        
    }
    get(id: number): Player {
        return {
            id: id, 
            first_name: `User`,
            last_name: "na",
            elo: 0,
            fav_color: "na",
            fav_ball: "na",
            nickname: "na",
            emoji: "na"
        }
    }
}

export {PlayerAPI};