import { Sequelize } from "sequelize";
import envConfig from "./env.js";
envConfig.init();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
);

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
  } catch (err) {
    throw Error(`DB ERROR: ${err}`);
  }
};

export { sequelize, connectToDb };
