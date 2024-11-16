import axios from "axios";

interface Vacation {
  id: number;
  destination: string;
  start_date: string;
  end_date: string;
  description: string;
  vacation_photo: string;
  price: number;
}
export async function SendToApiVacations() {
  const url = `http://localhost:3002/api/vacations`;
  console.log(url);
  try {
    const result = await axios.get(url);
    console.log(result);

    const data = result?.data?.vacations.map((v: Vacation) => {
      return {
        id: v.id,
        destination: v.destination,
        start_date: new Date(v.start_date).toLocaleString(),
        end_date: new Date(v.end_date).toLocaleString(),
        description: v.description,
        price: v.price,
        vacation_photo: v.vacation_photo,
      };
    });

    return data;
  } catch (error) {
    console.error("Error fetching vacations:", error);
    throw error;
  }
}

export async function deleteVacation(vacationId: number) {
  const url = `http://localhost:3002/api/delete-vacation/${vacationId}`;
  console.log(`DELETE request to: ${url}`);

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete vacation");
  }

  return response.json();
}

export async function followVacation(vacationId: number, userId: number) {
  const url = `http://localhost:3002/api/follow/`;
  console.log(`DELETE request to: ${url}`);

  const result = await axios.post(url, { vacationId, userId });

  if (result.status !== 200) {
    throw new Error("Failed to delete vacation");
  }

  return result.data;
}
