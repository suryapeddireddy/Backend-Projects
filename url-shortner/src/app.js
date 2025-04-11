import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
const app=express();
app.use(cors({origin:process.env.ORIGIN}));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
import urlroutes from './routes/url.routes.js';
app.use('/api/v1/urls',urlroutes);
export default app;