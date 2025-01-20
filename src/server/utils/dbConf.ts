import path from "path";
import { Sequelize } from "sequelize";
import { SequelizeStorage, Umzug } from "umzug";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pg = require("pg");

const {
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  NODE_ENV,
} = process.env;

const sslMode = NODE_ENV !== "production" ? "" : "?sslmode=require";

let sequelize: Sequelize;
try {
  sequelize = new Sequelize(
    `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}${sslMode}`,
    { dialectModule: pg },
  );
} catch (err) {
  sequelize = new Sequelize(
    `postgres://dummy:dummy@dummy:5432/dummy${sslMode}`,
    { dialectModule: pg },
  );
}
const umzug = new Umzug({
  migrations: { glob: path.join(__dirname, "../migrations/*.ts") },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected database");
  } catch (err) {
    throw Error(`DB ERROR: ${err}`);
  }
};

const dbConf = {
  sequelize,
  umzug,
  connectToDb,
};

export default dbConf;
