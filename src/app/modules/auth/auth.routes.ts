import express from "express";
import authController from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const authRouter = express.Router();

// All APIs
authRouter.get("/", authController.authController); // Just for check
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/test", authMiddleware, authController.test);

export default authRouter;
