import { Request, Response, NextFunction } from "express";
import { jwthelper } from "../utils/jwt.utils";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const verified = jwthelper.verifyToken(token);
    console.log(verified);
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid Token" });
  }
};
