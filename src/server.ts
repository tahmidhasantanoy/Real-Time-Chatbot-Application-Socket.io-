import { Server } from "http";
import app from "./app";
import config from "./app/config/config";
import mongoose from "mongoose";

let server: Server;
const bootstrap = async () => {
  try {
    await mongoose.connect(config.db_url as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

bootstrap();
