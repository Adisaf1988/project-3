import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getConnection } from "../../database";
import { z } from 'zod';

// Validation schema for Zod
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

const loginHandler = async (req: Request, res: Response) => {
  const connection = await getConnection();

  try {
    // Validation with Zod
    const parsedData = loginSchema.parse(req.body);
    const { email, password } = parsedData;

    // Check if the email exists in the database
    const result = await connection?.execute('SELECT * FROM vacations.users WHERE email = ?', [email]);
    if (!result) {
      return res.status(500).json({ message: 'Database query failed' });
    }
    const [rows]: any = result;
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the encrypted password
    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Success - you can return a token or additional details
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default loginHandler;