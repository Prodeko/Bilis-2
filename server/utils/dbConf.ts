import path from 'path'
import pg from 'pg'
import { Sequelize } from 'sequelize'
import { SequelizeStorage, Umzug } from 'umzug'

const { POSTGRES_USER, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, NODE_ENV } =
  process.env

const sslMode = NODE_ENV === 'development' ? '' : '?sslmode=require'

const sequelize = new Sequelize(
  `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}${sslMode}`,
  { dialectModule: pg }
)

const umzug = new Umzug({
  migrations: { glob: path.join(__dirname, '../migrations/*.ts') },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
})

const connectToDb = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected database')
  } catch (err) {
    throw Error(`DB ERROR: ${err}`)
  }
}

const dbConf = {
  sequelize,
  umzug,
  connectToDb,
}

export default dbConf
