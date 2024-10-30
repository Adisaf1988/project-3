import axios from "axios";

interface Vacation {
  destination: string;
  start_date: string;
  end_date: string;
  description: string;
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
          destination: v.destination,
          start_date: new Date(v.start_date).toLocaleString(),
          end_date: new Date(v.end_date).toLocaleString(),
          description: v.description,
          price: v.price,
        };
      });
  
      return data;
    } catch (error) {
      console.error("Error fetching vacations:", error);
      throw error;
    }
  }