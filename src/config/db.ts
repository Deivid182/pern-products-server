import { Sequelize } from "sequelize-typescript";
import { DB_NAME, CLIENT_URL, DB_PASSWORD, DB_USER } from "./envs";

export const db = new Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD!, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  models: [__dirname + '/../models/**/*.ts'],
})