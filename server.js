const express = require("express");
require("dotenv").config({path:"./config/.env"});
const connectDB = require('./config/connectDB');
const authRouter = require('./routes/Auth')

//connect db
connectDB()

const app = express();
//middleware 
app.use(express.json())

//use Routes
app.use('/api/auth',authRouter)

const PORT = process.env.PORT || 5001 ; 

app.listen(PORT,(err)=>{
    err? console.log(err)
    :console.log(`server is runnig on port ${PORT}`)
})