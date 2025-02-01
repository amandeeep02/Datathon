import { ObjectId, Document } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  currentLocation: string;
  destination: string;
  eta: string;
  isOnline: boolean;
  activeJourney: ObjectId;
}
