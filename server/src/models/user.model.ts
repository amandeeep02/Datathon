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
    gender: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    currentLocation: String,
    destination: String,
    eta: String,
    isOnline: {
      type: Boolean,
      default: false,
    },
    activeJourney: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Journey",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("Users", UserSchema);

export default UserModel;
