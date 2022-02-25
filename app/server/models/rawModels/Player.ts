import { Model, DataTypes } from "sequelize";
import {
	PlayerMeta,
	PlayerWithoutElo,
	Player as ReturnPlayer,
} from "../../../common/types";
import { intToHex } from "../../../common/utils/colorConvert";
import dbConf from "../../utils/dbConf";

class Player extends Model {
	declare id: number;
	declare firstName: string;
	declare lastName: string;
	declare nickname: string;
	declare elo: number;
	declare favoriteColor: number;

	getPlayerMeta(): PlayerMeta {
		return {
			id: this.id,
			firstName: this.firstName,
			lastName: this.lastName,
			nickname: this.nickname,
		};
	}

	getPlayerWithoutElo(): PlayerWithoutElo {
		return {
			...this.getPlayerMeta(),
			favoriteColor: intToHex(this.favoriteColor),
		};
	}

	getPlayerType(): ReturnPlayer {
		return {
			...this.getPlayerWithoutElo(),
			elo: this.elo,
		};
	}
}

Player.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		firstName: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		nickname: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		elo: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
		favoriteColor: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize: dbConf.sequelize,
		underscored: true,
		timestamps: true,
		modelName: "player",
	}
);

export default Player;