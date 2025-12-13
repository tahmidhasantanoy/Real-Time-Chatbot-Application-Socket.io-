import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 8000,
  db_url: process.env.DB_URL || "",
  salt_round: process.env.SALT_ROUNDS,
  access_token_secret_key: process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret_key: process.env.REFRESH_TOKEN_SECRET,
  expires_in: process.env.EXPIRES_IN,
  refresh_expires_in: process.env.REFRESH_EXPIRES_IN,
};
