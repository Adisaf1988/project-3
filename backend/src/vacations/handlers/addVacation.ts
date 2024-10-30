import { getConnection } from "../../database";

interface Vacation {
  destination: string;
  description: string;
  start_date: string;
  end_date: string;
  price: number;
  vacation_photo: string;
}

export async function addVacation(vacation: Vacation) {
  const query = `INSERT INTO vacations.all_vacations (destination, description, start_date, end_date, price, vacation_photo)
                 VALUES (?, ?, ?, ?, ?, ?)`;
  const connection = await getConnection();

  try {
    const [result]: any = await connection?.execute(query, [
      vacation.destination,
      vacation.description,
      vacation.start_date,
      vacation.end_date,
      vacation.price,
      vacation.vacation_photo,
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
