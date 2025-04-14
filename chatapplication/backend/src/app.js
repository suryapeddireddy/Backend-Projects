import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app=express();
app.use(express.json());
app.use(cors({origin:process.env.ORIGIN}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
import userRoutes from './routes/user.routes.js'
import messageRoutes from './routes/message.routes.js'
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/messages', messageRoutes);
export default app;
