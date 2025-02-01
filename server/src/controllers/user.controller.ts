import { Request, Response } from "express";
import UserModel from "../models/user.model";

export const createOrUpdateUser = async (req: Request, res: Response) => {
  const {
    email,
    firstName,
    lastName,
    experienceLevel,
    investmentTimeline,
    investmentBudget,
    tradingStrategy,
  } = req.body;

  try {
    const user = await UserModel.findOneAndUpdate(
      { email },
      {
        firstName,
        lastName,
        email,
        experienceLevel,
        investmentTimeline,
        investmentBudget,
        tradingStrategy,
      },
      { new: true, upsert: true }
    );
    res.json(user);
  } catch (err) {
    console.error("Create/Update user error:", err);
    res.status(400).json({ error: "Failed to create/update user" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ error: "Failed to get user details" });
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Get user by email error:", err);
    res.status(500).json({ error: "Failed to get user details" });
  }
};