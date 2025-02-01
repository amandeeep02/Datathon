import express from "express";
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

export default router;
