const mongoose = require("mongoose")

const uri = 'mongodb+srv://prashantui1491:VPAGL6FT6KXkdWah@cluster0.ryqzua5.mongodb.net/devTinder'

const connectDb = async() =>{
    await mongoose.connect(uri)
}

module.exports = connectDb

