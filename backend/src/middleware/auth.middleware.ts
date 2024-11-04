import { error } from "console";
import { RequestHandler } from "express";
import * as jwt from "jsonwebtoken";

export const authMiddleware: RequestHandler = (req, res, next) => {
  try {
    const tokenHeader =
      req.headers["authorization"] || req.headers["Authorization"];

    if (!tokenHeader) {
      throw new Error("Unauthorized, token missing");
    }

    const token = tokenHeader.slice("Bearer ".length) as string;

    if (!token) {
      throw new Error("Unauthorized, token badly formatted");
    }

    const decoded = jwt.decode(token) as { user_id: string; role: string };

    req.user = decoded;
    next();
  } catch (e: any) {
    res.status(401).json({ error: e.message });
  }
};
