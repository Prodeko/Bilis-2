const { Sequelize } = require("sequelize");
const envConfig = require("./env.js");
const { SequelizeStorage, Umzug } = require("umzug");
const path = require("path");

envConfig.init();

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  OLD_DB_PORT,
  DB_NAME,
  PROD_DB_HOST,
  PROD_DB_PORT,
  PROD_DB_NAME,
  PROD_DB_USER,
  PROD_DB_PASSWORD,
} = process.env;

const oldSequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${OLD_DB_PORT}/${DB_NAME}`,
);

const newSequelize = new Sequelize(
  `postgres://${PROD_DB_USER}:${PROD_DB_PASSWORD}@${PROD_DB_HOST}:${PROD_DB_PORT}/${PROD_DB_NAME}?sslmode=require`,
);

const migrationConf = {
  migrations: { glob: path.join(__dirname, "../migrations/*.js") },
  context: newSequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize: newSequelize }),
  logger: console,
};

const runMigrations = async () => {
  console.log("RUNNING");
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log("migrations up to date", {
    files: migrations.map((m) => m.name),
  });
};

const connectToDbs = async () => {
  try {
    await oldSequelize.authenticate();
    await newSequelize.authenticate();
    await runMigrations();
  } catch (err) {
    throw Error(`DB ERROR: ${err}`);
  }
};

module.exports = { oldSequelize, newSequelize, connectToDbs };
