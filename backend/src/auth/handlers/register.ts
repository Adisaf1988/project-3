import { Request, Response } from "express";
import { registerSchema } from "../index";
import bcrypt from "bcrypt";
import { getConnection } from "../../database";
import { z } from "zod";
import * as jwt from "jsonwebtoken";

import * as dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const registerHandler = async (req: Request, res: Response) => {
  try {
    const connection = await getConnection();
    if (!connection) {
      res.status(500).json({ message: "Database connection failed" });
      return;
    }

    const parsedData = registerSchema.parse(req.body);
    const { firstName, lastName, email, password } = parsedData;

    const [rows, fields] = await connection.execute<any[]>(
      "SELECT * FROM vacations.users WHERE email = ?",
      [email]
    );
    if (rows.length > 0) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await connection?.execute(
      "INSERT INTO vacations.users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, hashedPassword]
    );
    const id = (newUser[0] as any).insertId;
    const token = jwt.sign(
      { user_id: id, role: "user" },
      JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    res.status(201).json({ access_token: token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: (error as z.ZodError).errors });
      return;
    }
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default registerHandler;
