import { model, Schema } from "mongoose";
import { IUserInfo } from "./auth.interface";

const userDataSchema = new Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});

export const userModel = model<IUserInfo>("User", userDataSchema);
