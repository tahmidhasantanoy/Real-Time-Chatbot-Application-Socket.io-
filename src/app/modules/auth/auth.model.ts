import { model, Schema } from "mongoose";
import { IUserInfo } from "./auth.interface";

const userDataSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  createdAt: { type: Date, default: Date.now() },
});

export const userModel = model<IUserInfo>("User", userDataSchema);
