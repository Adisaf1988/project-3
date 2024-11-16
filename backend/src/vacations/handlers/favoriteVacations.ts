import { getConnection } from "../../database";

export async function follow(vacationId: number, userId: number) {
  const query = `INSERT INTO vacations.followers (followers_id, vacation_id)
                 VALUES (?, ?)`;
  const connection = await getConnection();

  try {
    const [result]: any = await connection?.execute(query, [
      vacationId,
      userId,
    ]);
    console.log("Insert Result:", result);

    if (result && result.insertId) {
      return result.insertId;
    } else {
      throw new Error("Insert failed, no insertId returned.");
    }
  } catch (error) {
    console.error("Database Insert Error:", error);
    throw error;
  }
}
