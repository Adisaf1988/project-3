import { getConnection } from "../../database";

export async function getAllFollows() {
  const connection = await getConnection();
  const resultVacationsFollowed = await connection?.execute(
    "SELECT V.destination, COUNT (F.followers_id) as follows FROM vacations.followers F INNER JOIN vacations.all_vacations V ON V.id = F.vacation_id GROUP BY V.id"
  );
  const [rows] = resultVacationsFollowed as any;
  return rows;
}
