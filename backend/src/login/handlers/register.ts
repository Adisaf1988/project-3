import { Request, Response } from 'express';
import { registerSchema } from '../index'; // Import validation schema
import bcrypt from 'bcrypt';
import { getConnection } from "../../database";
import { z } from 'zod';

const registerHandler = async (req: Request, res: Response) => {
  try {
    const connection = await getConnection();
    if (!connection) {
      return res.status(500).json({ message: 'Database connection failed' });
    }

    // Validation with Zod
    const parsedData = registerSchema.parse(req.body);
    const { firstName, lastName, email, password } = parsedData;

    // Check if the email already exists in the database

    const [rows, fields] = await connection.execute<any[]>('SELECT * FROM vacations.users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add the new user to the database

    await connection?.execute(
      'INSERT INTO vacations.users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
      [firstName, lastName, email, hashedPassword]
    );
    // Redirect to the vacations page after successful registration
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: (error as z.ZodError).errors });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export default registerHandler;