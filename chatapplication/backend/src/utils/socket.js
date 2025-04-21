import {Server} from 'soket.io';
import http from 'http';
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
const app=express();

const server=http.createServer(app);

const io=new Server(server,{
cors:{
origin:["http://localhost:3000"]
}
} );
app.use(express.json());
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
import userRoutes from './routes/user.routes.js'
import messageRoutes from './routes/message.routes.js'
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/messages', messageRoutes);
export default app;

export {io, app, server};