import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userInfoSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

// Create and export the model
export const userModel = model("User", userInfoSchema);
