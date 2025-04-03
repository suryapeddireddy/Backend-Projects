import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
const app=express();
app.use(cors({
origin:process.env.CORS_ORIGIN,
credentials:true
}))// accepts requrests from other ports, and allows cookie sharing and many more
app.use(express.urlencoded({extended:true, limit:'20kb'}))
app.use(express.json({limit:'20kb'}))
app.use(express.static("public"))

import productroutes from '../routes/product.routes.js'
app.use('/api/v1/products',productroutes);

export default app;