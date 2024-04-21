const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const connnection = require("./Config/Mongo")
const router = require("./Router/Testrouter")

const app=express()
connnection()
app.use(express.json())

app.use(cors())
app.use('/',router)
dotenv.config()















const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>console.log(`server running on ${PORT}`));