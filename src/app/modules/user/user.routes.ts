import express from "express";
import userController from "./user.controller";

const router = express.Router();

// All APIs
router.post("/", userController.x);

export default router;
