import { Sequelize } from 'sequelize';
import config from './config.js';

const { MYSQL_DB_NAME, MYSQL_HOST, MYSQL_LOGIN, MYSQL_PASSWORD, MYSQL_PORT } = config;

const sequelize = new Sequelize(MYSQL_DB_NAME, MYSQL_LOGIN, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    dialect: 'mysql',
    logging: (msg) => console.log(`[DB]: ${msg}`)
});

try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;