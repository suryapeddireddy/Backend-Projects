// utils/socket.js
import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  if (!socket) {
    socket = io("http://localhost:3000", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      socket.emit("register-user", userId);
      console.log("Socket connected ✅");
    });
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("Socket disconnected ❌");
  }
};

export const getSocket = () => socket;
