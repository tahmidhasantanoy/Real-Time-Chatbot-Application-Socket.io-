import express, { Request, Response } from "express";
import cors from "cors";
const app = express();
import authRouter from "./app/modules/auth/auth.routes";

// Parser
app.use(express.json());
app.use(cors());

// APIs
app.use("/api/auth", authRouter);


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
