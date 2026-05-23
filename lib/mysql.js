import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

// conexión con MySQL
const sequelize =
  global.mysqlConnection ||
  new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT) || 3306,
      dialect: "mysql",
      dialectModule: mysql2,
      logging: false,
    }
  );

if (!global.mysqlConnection) {
  global.mysqlConnection = sequelize;
}

export default sequelize;