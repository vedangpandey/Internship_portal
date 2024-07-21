import express from 'express'
import dotenv from 'dotenv'
import authroutes from './routes/auth.routes.js'
import connectToMongoDb from './db/connectToMongoDb.js'
const app=express()
dotenv.config()

const PORT=process.env.PORT;
app.use(express.json())
// app.use("/",(req,res)=>{
//     res.send("Yo")
// })
app.use("/",authroutes);
app.listen(PORT,()=>{
    connectToMongoDb();
    console.log(`server started on ${PORT}`);
})
