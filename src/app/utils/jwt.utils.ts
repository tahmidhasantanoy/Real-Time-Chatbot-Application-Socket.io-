import jwt, { Secret } from "jsonwebtoken";
import { JwtPayload } from "../types/types";
import config from "../config/config";

type createUserType = {
  userId: any;
  email: string;
};
const generateToken = (
  createUserInfo: createUserType,
  access_token: any,
  expires_in: any
) => {
  const { userId, email } = createUserInfo;
  return jwt.sign({ userId, email }, access_token, {
    expiresIn: expires_in,
  });
};

const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.access_token_secret_key as Secret);

    return decoded as JwtPayload;
  } catch (err: any) {
    console.log(err.message, "verify message");
  }
};

export const jwthelper = { generateToken, verifyToken };
