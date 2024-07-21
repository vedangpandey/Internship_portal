import express from 'express'
import dotenv from 'dotenv'
import router from './routes/auth.routes.js'
const app=express()
dotenv.config()

const PORT=process.env.PORT;
app.use(express.json())
// app.use("/",(req,res)=>{
//     res.send("Yo")
// })
app.use("/",router);
app.listen(PORT,()=>{
    console.log(`server started on ${PORT}`);
})
