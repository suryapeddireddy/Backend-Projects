// server.js or index.js
import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

// App and server setup
const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
    credentials: true,
  },
});

// Map to store userId => socketId
const userSocketMap = new Map();

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Register the user
  socket.on("register-user", (userId) => {
    userSocketMap.set(userId, socket.id);
    socket.data.userId = userId;
    console.log(`User ${userId} registered with socket ${socket.id}`);

    // Notify others
    io.emit("user-status", { userId, status: "online" });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    const userId = socket.data.userId;
    if (userId) {
      userSocketMap.delete(userId);
      console.log(`User ${userId} disconnected`);

      // Notify others
      io.emit("user-status", { userId, status: "offline" });
    } else {
      console.log("A user disconnected without userId:", socket.id);
    }
  });
});

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
import userRoutes from "../routes/user.routes.js";
import messageRoutes from "../routes/message.routes.js";
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/messages", messageRoutes);

// ➕ API to get all online users
app.get("/api/v1/online-users", (req, res) => {
  const onlineUserIds = Array.from(userSocketMap.keys());
   res.json({ onlineUserIds });
});

// Exports
export { io, app, server, userSocketMap };
