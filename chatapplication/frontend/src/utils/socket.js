// utils/socket.js
import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (username) => {
  if (!socket) {
    socket = io("http://localhost:3000", {
      withCredentials: true,
      query: { username },
    });

    socket.on("connect", () => {
      console.log("Socket connected ✅");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected ❌");
    });
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
