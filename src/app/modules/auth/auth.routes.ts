import express from "express";
import authController from "./auth.controller";

const authRouter = express.Router();

// All APIs
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/refresh-token", authController.refreshToken);

export default authRouter;
