import express, { Request, Response } from "express";
import { getVacations } from "./handlers/getVacations";
import { addVacation } from "./handlers/addVacation";
import { editVacation } from "./handlers/editVacation";
import { deleteVacation } from "./handlers/deleteVacation";
import { follow } from "./handlers/favoriteVacations";
import { getAllFollows } from "./handlers/getFollows";

const vacationsRouter = express.Router();

vacationsRouter.get("/vacations", async (_req: Request, res: Response) => {
  try {
    const data = await getVacations();
    res.json({ vacations: data });
  } catch (error) {
    console.error("Error fetching vacations:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

vacationsRouter.get(
  "/follows",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const follows = await getAllFollows();
      console.log(follows);
      res.json({ follows });
    } catch (error) {
      console.log("Error in follows:", error);
      res.status(400).json({ error: "Something went wrong" });
    }
  }
);
vacationsRouter.post(
  "/add-vacation",
  async (req: Request, res: Response): Promise<void> => {
    console.log("Request Body:", req.body);

    try {
      const newVacation = extractVacation(req.body);
      const result = await addVacation(newVacation);
      res.json({ result });
    } catch (error) {
      console.log("Error in addVacation:", error);
      res.status(400).json({ error: "Something went wrong" });
    }
  }
);
vacationsRouter.put(
  "/edit-vacation",
  async (req: Request, res: Response): Promise<void> => {
    console.log("Request Body:", req.body);

    try {
      const result = await editVacation(req.body);
      res.json({ result });
    } catch (error) {
      console.log("Error in editVacation:", error);
      res.status(400).json({ error: "Something went wrong" });
    }
  }
);

vacationsRouter.post(
  "/follow",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await follow(req.body.vacationId, req.body.userId);
      res.status(200).json({ result });
    } catch (error) {
      console.log("Error in editVacation:", error);
      res.status(400).json({ error: "Something went wrong" });
    }
  }
);

vacationsRouter.delete(
  "/delete-vacation/:id",
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    console.log(`Received delete request for vacationId: ${id}`);
    try {
      const result = await deleteVacation(Number(id));
      res.json({ result });
    } catch (error) {
      console.log("Error in deleteVacation:", error);
      res.status(400).json({ error: "Something went wrong" });
    }
  }
);

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
