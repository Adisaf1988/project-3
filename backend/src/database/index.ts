import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

let connection: mysql2.Connection | null = null;
export async function getConnection() {
  if (connection !== null) return connection;
  try {
    console.log("create connection");
    connection = await mysql2.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_SCHEMA,
      port: Number(process.env.MYSQL_PORT) || 3306,
    });
    return connection;
  } catch (error) {
    console.log(error);
  }
}
