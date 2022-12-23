const mongoose = require("mongoose");

const connectDB = async()=>{
    try {
        await mongoose.set('strictQuery', false).connect(process.env.mongo_URI)
        console.log("mongo DB connected")
    } catch (error) {
        console.log(`database failed to connected ${error}`)
    }
}

module.exports = connectDB