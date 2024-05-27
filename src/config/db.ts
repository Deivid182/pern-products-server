import { Sequelize } from "sequelize-typescript";
import "dotenv/config";

export const db = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  models: [__dirname + '/../models/**/*.ts'],
})