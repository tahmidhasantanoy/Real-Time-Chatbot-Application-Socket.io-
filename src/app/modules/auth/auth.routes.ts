import express from "express";
import authController from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const authRouter = express.Router();

// All APIs
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/test", authMiddleware, authController.test);
authRouter.post("/refresh-token", /* authMiddleware, */ authController.refreshToken);
authRouter.get("/", authController.authController); // Just for check

export default authRouter;
