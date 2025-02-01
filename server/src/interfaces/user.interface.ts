import { ObjectId, Document } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  experienceLevel: "beginner" | "moderate" | "pro";
  investmentTimeline: "long-term" | "short-term";
  investmentBudget: number;
  tradingStrategy: string;
}
