import { NextFunction, Request, Response } from "express";
import authService from "./auth.service";

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
  login,
  register,
  refreshToken,
};
