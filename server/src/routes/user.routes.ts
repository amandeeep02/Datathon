import express from "express";
import { processTelegramRequest } from "../controllers/telegramProcess";
import {
  createOrUpdateUser,
  getUserById,
  getUserByEmail,
} from "../controllers/user.controller";
import { authCheck } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/user", authCheck, createOrUpdateUser);
router.get("/user/:id", authCheck, getUserById);
router.get("/user/email/:email", authCheck, getUserByEmail);
router.post("/telegram", processTelegramRequest);

export default router;
