import bcrypt from "bcrypt";
import { IUserInfo } from "./auth.interface";
import { userModel } from "./auth.model";
import config from "../../config/config";
import { jwthelper } from "../../utils/jwt.utils";
import jwt, { Secret } from "jsonwebtoken";

const authService = () => {};

const register = async (userInfo: IUserInfo) => {
  const { name, email, password } = userInfo;

  try {
    const isExist = await userModel.findOne({ email });
    if (isExist) return "Email already exist";

    const hashPassword = await bcrypt.hash(password as string, 10);

    const createUser = await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    if (!createUser) {
      return "No user created";
    }

    const access_token = jwthelper.generateToken(
      { userId: createUser._id, email: createUser.email },
      config.access_token_secret_key,
      config.expires_in
    );

    const refresh_token = jwthelper.generateToken(
      { userId: createUser._id, email: createUser.email },
      config.refresh_token_secret_key,
      config.expires_in
    );

    return {
      user: {
        id: createUser._id,
        name: createUser.name,
        email: createUser.email,
      },
      accessToken: access_token,
      refreshToken: refresh_token,
    };
  } catch (error) {
    console.log(error);
  }
};
const login = async (userInfo: IUserInfo) => {
  const { email, password } = userInfo;

  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const access_token = jwthelper.generateToken(
    { userId: user._id, email: user.email },
    config.access_token_secret_key,
    config.expires_in
  );

  const refresh_token = jwthelper.generateToken(
    { userId: user._id, email: user.email },
    config.refresh_token_secret_key,
    config.expires_in
  );

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    accessToken: access_token,
    refreshToken: refresh_token,
  };
};

const refreshToken = (refreshToken: string) => {
  const decoded = jwt.verify(
    refreshToken,
    config.refresh_token_secret_key as Secret
  );

  if (typeof decoded === "string") {
    console.log("Token payload is string:", decoded);
  } else {
    console.log(decoded.userId, "decode from service");
    if (decoded) {
      const payload = {
        userId: decoded.userId,
        email: decoded.email,
      };
      const access_token = jwthelper.generateToken(
        payload,
        config.access_token_secret_key,
        config.expires_in
      );

      const refresh_token = jwthelper.generateToken(
        payload,
        config.refresh_token_secret_key,
        config.expires_in
      );

      return { refresh_token, access_token };
    }
  }
};

const test = async () => {
  return "Okay now";
};
export default {
  authService,
  register,
  login,
  test,
  refreshToken,
};
