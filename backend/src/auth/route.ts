import express from "express";
import registerHandler from "./handlers/register";
import loginHandler, { userDetailsHandler } from "./handlers/login";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", registerHandler);

router.post("/login", loginHandler);
router.get("/userDetails", authMiddleware, userDetailsHandler);

export default router;
