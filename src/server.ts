// import { Server } from "http";
// import http from "http";
// import app from "./app";
// import config from "./app/config/config";
// import mongoose from "mongoose";
// import { Server as IOServer } from "socket.io";
// import { chatSocket } from "../src/app/modules/message/chat.socket";

// let server: Server;
// const bootstrap = async () => {
//   try {
//     await mongoose
//       .connect(config.db_url as string)
//       .then(() => {
//         console.log("DB coonceted");

//         const httpServer = http.createServer(app);
//         const io = new IOServer(httpServer, { cors: { origin: "*" } });

//         // attach socket logic
//         chatSocket(io);
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });

//     server = app.listen(config.port, () => {
//       console.log(`Example app listening on port ${config.port}`);
//     });
//   } catch (err: any) {
//     console.log(err.message);
//   }
// };

// bootstrap();

/* ------------------------------------------------------------------------------------------------------- */

import { Server } from "http";
import http from "http";
import app from "./app";
import config from "./app/config/config";
import mongoose from "mongoose";
import { Server as IOServer } from "socket.io";
import { chatSocket } from "../src/app/modules/message/chat.socket";

let server: Server;
const bootstrap = async () => {
  try {
    await mongoose
      .connect(config.db_url as string)
      .then(() => {
        console.log("DB connected");

        const httpServer = http.createServer(app);
        const io = new IOServer(httpServer, { cors: { origin: "*" } });

        // attach socket logic
        chatSocket(io);

        // START the httpServer (not app.listen)
        server = httpServer.listen(config.port, () => {
          console.log(`Server listening on port ${config.port}`);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (err: any) {
    console.log(err.message);
  }
};

bootstrap();
