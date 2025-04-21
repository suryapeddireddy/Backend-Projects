import { Server } from 'socket.io'; // fixed typo here
import http from 'http';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN, // reuse the same value
    credentials: true,
  },
});
io.on("connection", (socket)=>{
console.log("A user connnected", socket.id);
socket.on("disconnect",()=>{
console.log("A user disconnected", socket.id);
})
})



app.use(express.json());
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import userRoutes from '../routes/user.routes.js'
import messageRoutes from '../routes/message.routes.js';
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/messages', messageRoutes);

export { io, app, server };
