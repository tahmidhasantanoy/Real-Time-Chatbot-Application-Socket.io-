import express, { Request, Response } from "express";
import cors from "cors";
const app = express();
import authRouter from "./app/modules/auth/auth.routes";
import chatRoutes from "./app/modules/message/chat.routes";

// Parser
app.use(express.json());
app.use(cors());

// APIs
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello quick World!");
});

export default app;
