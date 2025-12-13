import mongoose from "mongoose";

export interface IMessage {
  sender: mongoose.Types.ObjectId | string;
  receiver?: mongoose.Types.ObjectId | string | null;
  content: string;
  createdAt?: Date;
}
