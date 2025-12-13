import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import chatController from "./chat.controller";

const chatRouter = Router();

chatRouter.post("/send", authMiddleware, chatController.postMessage);
chatRouter.get("/global", authMiddleware, chatController.fetchGlobal);
chatRouter.get("/private/:otherId", authMiddleware, chatController.fetchPrivate);

export default chatRouter;
