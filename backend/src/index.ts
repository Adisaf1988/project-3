import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { vacationsRouter } from "./vacations";
import authRouter from "./auth/route";
import multer from "multer";
import registerHandler from "./auth/handlers/register";
import loginHandler from "./auth/handlers/login";
import path = require("path");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    // Generate a unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Initialize the multer upload object with the storage configuration
const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  // Return the URL of the uploaded file
  res.json({ filename: req.file.filename });
});

// Make the uploads folder publicly accessible
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRouter);
app.use("/api", vacationsRouter);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
