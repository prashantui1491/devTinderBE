const express = require('express')

const app = express()

//request handler, "/hello" is an route
app.use("/hello",(req, res)=>{
    res.send("Namaste nodemon att post 7777")
})

//listen to the port
app.listen(7777, ()=>{
    console.log("Server is successfully listening on port num 7777")
})