import { getConnection } from "../../database";

export async function getVacations() {
  const connection = await getConnection();
  if (!connection) {
    throw new Error("Database connection failed");
  }
  const [vacations] = await connection.execute(`
        SELECT 
            destination, start_date, end_date, description, price
        FROM
            vacations.all_vacations;
    `);
  return vacations;
}
