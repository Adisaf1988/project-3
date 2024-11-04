import { RequestHandler } from "express";

export const adminMiddleware: RequestHandler = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    next();
  } catch (e: any) {
    res.status(401).json({ error: e.message });
  }
};
