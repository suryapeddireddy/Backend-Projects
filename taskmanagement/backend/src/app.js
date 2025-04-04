import express from 'express';
const app=express();
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

app.use(cors({
origin:process.env.CORS_ORIGIN,
credentials:true,
}))
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb',extended:true}));


import userroutes from './routes/user.routes.js'
import taskroutes from './routes/task.routes.js'
app.use('/api/v1/user',userroutes);
app.use('/api/v1/task',taskroutes);
export default app;
