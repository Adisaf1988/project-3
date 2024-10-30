import axios from "axios";

interface AddVacation {
  destination: string;
  description: string;
  start_date: string;
  end_date: string;
  price: number;
  vacation_photo: string;
}

export async function addVacationToApi(vacation: AddVacation) {
  const url = `http://localhost:3002/api/add-vacation`;
  const vacationPost = {
    destination: vacation.destination,
    description: vacation.description,
    start_date: vacation.start_date,
    end_date: vacation.end_date,
    price: vacation.price,
    vacation_photo: vacation.vacation_photo,
  };

  console.log(vacationPost);

  try {
    const result = await axios.post(url, vacationPost, {
      headers: { "Content-Type": "application/json" },
    });
    return result;
  } catch (error) {
    console.error("Error in addVacationToApi:", error);
    throw error;
  }
}
