import { getConnection } from "../../database";

export async function follow(vacationId: number, userId: number) {
  const connection = await getConnection();
  const [existing] = await connection!.execute(
    `SELECT * FROM vacations.followers WHERE followers_id = ? AND vacation_id = ?`,
    [userId, vacationId]
  );

  try {
    if (!existing || (existing as any)?.length === 0) {
      const query = `INSERT INTO vacations.followers (followers_id, vacation_id)
                   VALUES (?, ?)`;
      const [result]: any = await connection?.execute(query, [
        userId,
        vacationId,
      ]);
      console.log("Insert Result:", result);
      if (result && result.insertId) {
        return result.insertId;
      } else {
        throw new Error("Insert failed, no insertId returned.");
      }
    } else {
      const query = `DELETE FROM vacations.followers 
      WHERE followers_id = ? AND vacation_id = ?`;
      const [result]: any = await connection?.execute(query, [
        userId,
        vacationId,
      ]);
      return undefined;
    }
  } catch (error) {
    console.error("Database Insert Error:", error);
    throw error;
  }
}
