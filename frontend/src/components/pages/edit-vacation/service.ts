import axios from "axios";

interface EditVacation {
  id: number;
  destination: string;
  description: string;
  start_date: string;
  end_date: string;
  price: number;
  vacation_photo: string;
}

export async function editVacationOnApi(vacation: EditVacation) {
  const url = `http://localhost:3002/api/edit-vacation`;
  const vacationPost = {
    id: vacation.id,
    destination: vacation.destination,
    description: vacation.description,
    start_date: vacation.start_date,
    end_date: vacation.end_date,
    price: vacation.price,
    vacation_photo: vacation.vacation_photo,
  };

  console.log(vacationPost);

  try {
    const result = await axios.put(url, vacationPost, {
      headers: { "Content-Type": "application/json" },
    });
    return result;
  } catch (error) {
    console.error("Error in addVacationToApi:", error);
    throw error;
  }
}
