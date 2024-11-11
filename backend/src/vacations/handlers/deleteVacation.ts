import { getConnection } from "../../database";

export async function deleteVacation(vacationId: number) {
  const query = `DELETE FROM vacations.all_vacations WHERE id = ?`;
  const connection = await getConnection();

  try {
    console.log(`Executing query: ${query} with vacationId: ${vacationId}`);
    const [result]: any = await connection?.execute(query, [vacationId]);
    console.log("Delete Result:", result);

    if (result.affectedRows > 0) {
      return { message: "Vacation deleted successfully" };
    } else {
      throw new Error("Deletion failed, no rows affected.");
    }
  } catch (error) {
    console.error("Database Delete Error:", error);
    throw error;
  }
}
