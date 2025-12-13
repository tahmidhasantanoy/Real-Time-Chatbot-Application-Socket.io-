import chatService from "./chat.service";
import { jwthelper } from "../../utils/jwt.utils";
import { Socket, Server } from "socket.io";

interface ExtendedSocket extends Socket {
  user?: { userId: string };
}

const onlineUsers = new Map<string, string>();

export const chatSocket = (io: Server) => {
  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication error: token missing"));

    const decoded = jwthelper.verifyToken(token);
    if (!decoded) return next(new Error("Authentication error: invalid token"));

    (socket as ExtendedSocket).user = { userId: decoded.userId };
    (socket as ExtendedSocket).user = { userId: decoded.userId };
    return next();
  });

  io.on("connection", (socket: ExtendedSocket) => {
    const userId = socket.user!.userId;
    onlineUsers.set(userId, socket.id);

    socket.join("global");

    // inform others
    socket.broadcast.emit("user_connected", { userId });

    // receive message events
    socket.on(
      "send_message",
      async (payload: { content: string; receiverId?: string | null }) => {
        console.log(payload, "payload from socket");

        try {
          const { content, receiverId = null } = payload;
          const msg = await chatService.saveMessage(
            userId,
            content,
            receiverId
          );

          if (!msg) {
            socket.emit("error", { message: "Message save failed" });
            return;
          }
          const out = {
            id: msg._id,
            sender: userId,
            content: msg.content,
            receiver: msg.receiver,
            createdAt: msg.createdAt,
          };

          if (receiverId) {
            const recvSocket = onlineUsers.get(receiverId);
            if (recvSocket) io.to(recvSocket).emit("message_received", out);
            socket.emit("message_sent", out);
          } else {
            // global
            io.to("global").emit("message_received", out);
          }
        } catch (err) {
          socket.emit("error", { message: "Message failed" });
        }
      }
    );

    socket.on("typing", (payload: { receiverId?: string | null }) => {
      const { receiverId = null } = payload;
      if (receiverId) {
        const recvSocket = onlineUsers.get(receiverId);
        if (recvSocket) io.to(recvSocket).emit("typing", { from: userId });
      } else {
        socket.broadcast.to("global").emit("typing", { from: userId });
      }
    });

    socket.on("disconnect", () => {
      onlineUsers.delete(userId);
      socket.broadcast.emit("user_disconnected", { userId });
    });
  });
};

export default chatSocket;
