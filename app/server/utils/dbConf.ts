import { Sequelize } from "sequelize";

const sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname");

const connectToDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected database');
    } catch (err) {
        throw Error(`DB ERROR: ${err}`);
    }
};

const dbConf = {
    sequelize
}

export default dbConf