import mongoose, { Schema } from "mongoose";
import { IMessage } from "./message.interface";

const messageSchema = new Schema<IMessage>({
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const Message = mongoose.model<IMessage>("Message", messageSchema);
