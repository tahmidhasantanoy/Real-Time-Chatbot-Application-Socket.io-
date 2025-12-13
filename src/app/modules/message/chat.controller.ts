import { Request, Response } from "express";
import chatService from "./chat.service";
import { jwthelper } from "../../utils/jwt.utils";

const postMessage = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const senderId = jwthelper.verifyToken(token)?.userId;

    const { content, receiverId } = req.body;

    let msg;
    if (senderId !== undefined)
      msg = await chatService.saveMessage(senderId, content, receiverId);
    res.status(201).json({ success: true, data: msg });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const fetchGlobal = async (_req: Request, res: Response) => {
  const msgs = await chatService.getGlobalMessages();
  res.json({ success: true, data: msgs });
};

const fetchPrivate = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const userId = jwthelper.verifyToken(token)?.userId;
  const otherId = req.params.otherId;

  console.log(userId, otherId, "From chat controller");

  const msgs = await chatService.getPrivateMessages(userId, otherId);
  res.json({ success: true, data: msgs });
};

export default {
  postMessage,
  fetchGlobal,
  fetchPrivate,
};
