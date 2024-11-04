import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { vacationsRouter } from "./vacations";
import authRouter from "./auth/route";

import registerHandler from "./auth/handlers/register";
import loginHandler from "./auth/handlers/login";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/api/auth", authRouter);
app.use("/api", vacationsRouter);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
