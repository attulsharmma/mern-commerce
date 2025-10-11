import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import cors from 'cors'

const startMongoDb = async()=>{
    try {
    const connection = await mongoose.connect(`mongodb+srv://attulsharmma:Ah9jkxMpSZy2iPzj@cluster0.vhujjtd.mongodb.net/`);
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


app.listen(PORT,()=>{
    console.log(`Server is now running on PORT ${PORT}`)
})