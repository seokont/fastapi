import { Sequelize } from "sequelize";
import "dotenv/config";

const dataBase: any = process.env.DATABASE_NAME;
const user: any = process.env.DB_USER;
const password: any = process.env.PASSWORD_DB;

export const sequelize = new Sequelize(dataBase, user, password, {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  // Other options
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
