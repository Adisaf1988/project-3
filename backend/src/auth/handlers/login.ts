import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { getConnection } from "../../database";
import { z } from "zod";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";

dotenv.config();
// Validation schema for Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

const JWT_SECRET = process.env.JWT_SECRET;

export const userDetailsHandler = async (req: Request, res: Response) => {
  const connection = await getConnection();

  try {
    console.log(req.user);
    const uid = req.user!.user_id;
    const result = await connection?.execute(
      "SELECT * FROM vacations.users WHERE users_id = ?",
      [uid]
    );

    const [rows]: any = result;

    const resultVacationsFollowed = await connection?.execute(
      "SELECT V.* FROM vacations.followers F INNER JOIN vacations.all_vacations V ON V.id = F.vacation_id WHERE F.followers_id = ?",
      [uid]
    );

    const [rowsFollows]: any = resultVacationsFollowed;
    res.status(200).json({ user: rows[0], follows: rowsFollows });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
      return;
    }
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginHandler = async (req: Request, res: Response) => {
  const connection = await getConnection();

  try {
    // Validation with Zod
    const parsedData = loginSchema.parse(req.body);
    const { email, password } = parsedData;

    // Check if the email exists in the database
    const result = await connection?.execute(
      "SELECT * FROM vacations.users WHERE email = ?",
      [email]
    );
    if (!result) {
      res.status(500).json({ message: "Database query failed" });
      return;
    }
    const [rows]: any = result;
    if (rows.length === 0) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Compare the encrypted password
    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const id = rows[0].users_id;
    const token = jwt.sign(
      { user_id: id, role: rows[0].role },
      JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    // Success - you can return a token or additional details
    res.status(200).json({ access_token: token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
      return;
    }
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default loginHandler;
