import { getConnection } from "../../database";

export async function getVacations() {
  const connection = await getConnection();
  if (!connection) {
    throw new Error("Database connection failed");
  }
  const [vacations] = await connection.execute(`
        SELECT 
            *
        FROM
            vacations.all_vacations;
    `);
  return vacations;
}
