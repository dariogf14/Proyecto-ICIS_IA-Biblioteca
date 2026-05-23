const fs = require("fs");
const mysql = require("mysql2/promise");
require("dotenv").config();

async function main() {
  // funcion para cargar MySQL
  const sql = fs.readFileSync("scripts/biblioteca.sql", "utf8");
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    multipleStatements: true
  });
  await connection.query(sql);
  await connection.end();
  console.log("MySQL cargado correctamente");
}

main().catch(error => {
  console.error(error.message);
  process.exit(1);
});
