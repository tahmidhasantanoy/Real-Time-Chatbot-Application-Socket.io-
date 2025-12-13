import { Message } from "./message.model";

const saveMessage = async (
  senderId: string,
  content: string,
  receiverId?: string | null
) => {
  try {
    const msg = await Message.create({
      sender: senderId,
      receiver: receiverId || null,
      content,
    });
    return msg;
  } catch (error: any) {
    console.log(error.message, "Error in service");
  }
};

const getGlobalMessages = async (limit = 50) => {
  const queryMsg = Message.find({ receiver: null })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

    return queryMsg
};

const getPrivateMessages = async (
  userId: string,
  otherId: string,
  limit = 50
) => {
  return Message.find({
    $or: [
      { sender: userId, receiver: otherId },
      { sender: otherId, receiver: userId },
    ],
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
};

export default {
  saveMessage,
  getGlobalMessages,
  getPrivateMessages,
};
