import { IUser } from "../interfaces/user.interface";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["beginner", "moderate", "pro"],
      required: true,
    },
    investmentTimeline: {
      type: String,
      enum: ["long-term", "short-term"],
      required: true,
    },
    investmentBudget: {
      type: Number,
      required: true,
    },
    tradingStrategy: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    labour: {
      type: Number,
      required: true,
    },
    transport: {
      type: Number,
      required: true,
    },
    material: {
      type: Number,
      required: true,
    },
    others: {
      type: Number,
      required: true,
    },
    monthlyProfits: {
      type: Number,
      required: true,
    },
    goals: {
      type: String,
      required: true,
    },
    riskTolerance: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("Users", UserSchema);
