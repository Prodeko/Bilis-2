import { Model, DataTypes } from 'sequelize';
import dbConf from "../utils/dbConf";

class Game extends Model {
    declare winnerId: number;
    declare loserId: number;
    declare winnerElo: number;
    declare loserElo: number;
    declare underTable: boolean;
    declare createdAt: Date;
}

Game.init({
    winnerElo: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    loserElo: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    underTable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: dbConf.sequelize,
    underscored: true,
    timestamps: true,
    updatedAt: false,
    modelName: 'game',
})

export default Game;