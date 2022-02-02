import path from "path";
import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";

declare global {
  var sequelizeStore: Sequelize | null | undefined;
}

const { POSTGRES_USER, POSTGRES_DB, POSTGRES_PASSWORD } = process.env;

const getSequelize = (): Sequelize => {
  if (!global.sequelizeStore) {
    global.sequelizeStore = new Sequelize(
      `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}`
    );
  }
  return global.sequelizeStore;
};

const umzug = new Umzug({
  migrations: { glob: path.join(__dirname, "../migrations/*.ts") },
  context: getSequelize().getQueryInterface(),
  storage: new SequelizeStorage({ sequelize: getSequelize() }),
  logger: console,
});

const connectToDb = async () => {
  try {
    await getSequelize().authenticate();
    console.log("Connected database");
  } catch (err) {
    throw Error(`DB ERROR: ${err}`);
  }
};

const dbConf = {
  getSequelize,
  umzug,
  connectToDb,
};

export default dbConf;
