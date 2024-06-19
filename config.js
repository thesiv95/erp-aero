import { config } from "dotenv";
config();

export default {
    EXPRESS_PORT: process.env.EXPRESS_PORT,
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_LOGIN: process.env.MYSQL_LOGIN,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_PORT: process.env.MYSQL_PORT,
    MYSQL_DB_NAME: process.env.MYSQL_DB_NAME
}