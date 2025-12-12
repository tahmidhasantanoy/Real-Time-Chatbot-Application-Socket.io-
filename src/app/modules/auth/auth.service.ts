import bcrypt from "bcrypt";
import { IUserInfo } from "./auth.interface";
import { userModel } from "./auth.model";
import config from "../../config/config";
import { jwthelper } from "../../utils/jwt.utils";

const authService = () => {};

const register = async (userInfo: IUserInfo) => {
  const { name, email, password } = userInfo;

  // Check: Is this email already exist!
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

    const token = jwthelper.generateToken(
      { userId: createUser._id, email: createUser.email }, //payload
      // jwtConfig.secret,
      // jwtConfig.expiresIn
      config.access_token_secret_key,
      config.expires_in
    );

    return {
      user: {
        id: createUser._id,
        name: createUser.name,
        email: createUser.email,
      },
      token,
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

  const token = jwthelper.generateToken(
    { userId: user._id, email: user.email },
    config.access_token_secret_key,
    config.expires_in
  );
  return {
    user: { id: user._id, email: user.email },
    token,
  };
};

const test = async () => {
  return "Okay now";
};
export default {
  authService,
  register,
  login,
  test,
};
