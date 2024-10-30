import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { vacationsRouter } from "./vacations";
import registerHandler from "./login/handlers/register";
import loginHandler from "./login/handlers/login";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api", vacationsRouter);

app.post("/register", async (req, res) => {
  await registerHandler(req, res);
});

app.post("/login", async (req, res) => {
  await loginHandler(req, res);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
