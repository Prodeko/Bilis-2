import { Model, DataTypes } from 'sequelize'
import { Player as PlayerType } from '../../../common/types'
import dbConf from '../../utils/dbConf'

class Player extends Model {
  declare id: number

  declare firstName: string

  declare lastName: string

  declare nickname: string

  declare emoji: string

  declare elo: number

  getPlayer(): PlayerType {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      nickname: this.nickname,
      emoji: this.emoji,
      elo: this.elo,
    }
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
      allowNull: false,
    },
    elo: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    emoji: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: dbConf.sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'player',
  }
)

export default Player
