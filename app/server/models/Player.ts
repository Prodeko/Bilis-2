import { Model, DataTypes } from 'sequelize';
import dbConf from "../utils/dbConf";


class Player extends Model {
    declare firstName: string;
    declare lastName: string;
    declare elo: number;
    declare favoriteColor: number;
}

Player.init({
    firstName: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    elo: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    favoriteColor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize: dbConf.sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'player',
})

export default Player;