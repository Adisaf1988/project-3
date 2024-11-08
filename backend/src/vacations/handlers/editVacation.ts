import { getConnection } from "../../database";

interface Vacation {
  id: number;
  destination: string;
  description: string;
  start_date: string;
  end_date: string;
  price: number;
  vacation_photo: string;
}

export async function editVacation(vacation: Vacation) {
  const query = `UPDATE vacations.all_vacations (destination, description, start_date, end_date, price, vacation_photo)
                 SET destination = ?, description = ?, start_date = ?, end_date = ?, price = ?, vacation_photo = ?
                 WHERE id = ?`;
  const connection = await getConnection();

  try {
    const [result]: any = await connection?.execute(query, [
      vacation.destination,
      vacation.description,
      vacation.start_date,
      vacation.end_date,
      vacation.price,
      vacation.vacation_photo,
      vacation.id,
    ]);
    console.log("Update Result:", result);

    if (result) {
      return result;
    } else {
      throw new Error("Update failed, no insertId returned.");
    }
  } catch (error) {
    console.error("Database Insert Error:", error);
    throw error;
  }
}
