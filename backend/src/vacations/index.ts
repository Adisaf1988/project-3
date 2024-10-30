import express, { Request, Response } from "express";
import { getVacations } from "./handlers/getVacations"; // מניח שקיימת פונקציה כזו
import { addVacation } from "./handlers/addVacation";

const vacationsRouter = express.Router();

// נתיב GET לקבלת כל החופשות
vacationsRouter.get("/vacations", async (_req: Request, res: Response) => {
  try {
    const data = await getVacations();
    res.json({ vacations: data });
  } catch (error) {
    console.error("Error fetching vacations:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// נתיב POST להוספת חופשה חדשה
vacationsRouter.post("/add-vacation", async (req: Request, res: Response): Promise<void> => {
  console.log("Request Body:", req.body);

  try {
    // חילוץ הנתונים מהבקשה
    const newVacation = extractVacation(req.body);
    const result = await addVacation(newVacation);
    res.json({ result });
  } catch (error) {
    console.log("Error in addVacation:", error);
    res.status(400).json({ error: "Something went wrong" });
  }
});

// פונקציה לחילוץ הנתונים מתוך הבקשה
function extractVacation(body: any) {
  const {
    destination,
    description,
    start_date,
    end_date,
    price,
    vacation_photo,
  } = body;
  return {
    destination,
    description,
    start_date,
    end_date,
    price,
    vacation_photo,
  };
}

export { vacationsRouter };
