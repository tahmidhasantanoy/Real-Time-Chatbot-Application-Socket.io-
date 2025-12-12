import { NextFunction, Request, Response } from "express";
import authService from "./auth.service";

const authController = (req: Request, res: Response) => {
  res.send("It's fine"); // Just for check
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const userInfo = req.body;

  const responseFromService = await authService.register(userInfo);

  if (responseFromService) {
    res.json({
      success: true,
      message: "ok",
      data: responseFromService,
    });
  }
};
const login = async (req: Request, res: Response) => {
  const userInfo = req.body;

  const responseFromService = await authService.login(userInfo);

  if (responseFromService) {
    res.json({
      success: true,
      message: "ok",
      data: responseFromService,
    });
  }
};

const test = async (req: Request, res: Response) => {
  const responseFromService = await authService.test();

  if (responseFromService) {
    res.json({
      success: true,
      message: "ok",
      data: responseFromService,
    });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  const refresToken = req.headers.authorization?.split(" ")[1];
  if (!refresToken) return res.status(401).json({ message: "Unauthorized" });

  const responseFromService = await authService.refreshToken(refresToken);

  if (responseFromService) {
    res.json({
      success: true,
      message: "ok",
      data: responseFromService,
    });
  }
};

export default {
  authController,
  login,
  register,
  test,
  refreshToken,
};
