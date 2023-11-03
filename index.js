

import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './routes/users.js';
import tourRoute from './routes/tours.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';

dotenv.config();
 const app = express();
 const port = process.env.PORT || 8000;
 const corsOptions = {
    origin:true,
    credentials:true
 }

// database connection
mongoose.set("strictQuery",false)
const connect = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology: true
        })
        console.log('mongodb database connected!')
    } catch (err) {
        console.log('mongodb database connection fail!')
    }
}

 // middleware
 app.use(express.json())
 app.use(cors(corsOptions))
 app.use(cookieParser())
 app.use("/api/v1/tours",tourRoute)
 app.use("/api/v1/users",userRoute)
 app.use("/api/v1/auth",authRoute)
 app.use("/api/v1/reviews",reviewRoute) 
 app.use("/api/v1/booking",bookingRoute)

 app.listen(port,()=>{
    console.log('server is now running on port',port)
    connect()
 });