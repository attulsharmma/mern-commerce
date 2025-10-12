import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import { authRouter } from "./routes/auth/auth-routes.js";

const startMongoDb = async()=>{
    try {
 
    const con = await mongoose.connect(`mongodb://localhost:27017/`);
    console.log("SERVER CONNECTED")
} catch (error) {
    console.log(error)
}
}
startMongoDb()

const app = express();

const PORT = process.env.PORT || 5001;

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","DELETE","PUT","PATCH"],
    allowedHeaders:[
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],
    credentials:true
}))

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRouter)


app.listen(PORT,()=>{
    console.log(`Server is now running on PORT ${PORT}`)
})