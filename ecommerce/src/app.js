import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
dotenv.config();
const app=express();
app.use(cors({
origin:process.env.CORS_ORIGIN,
credentials:true
}))// accepts requrests from other ports, and allows cookie sharing and many more
app.use(urlencoded({extended:true, limit:'20kb'}))
app.use(express.json({limit:'20kb'}))
app.use(express.static("public"))
app.use(cookieParser());

import productroutes from './routes/product.routes.js'
import userroutes from './routes/user.routes.js'
import categoriesroutes from './routes/categories.routes.js'
import brandroutes from './routes/brand.routes.js'
app.use('/api/v1/products',productroutes);
app.use('/api/v1/users',userroutes);
app.use('/api/v1/categories',categoriesroutes);
app.use('/api/v1/brands',brandroutes);
export default app;