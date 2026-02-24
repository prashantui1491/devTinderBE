const express = require('express')

const app = express()

// in the reposnce chain all are middle ware, finally we get the responce from one fucntion which is responce handler

app.get("/",(req, res, next)=>{
    console.log("res 1")
    //res.send("sent res1")
    next()
})

app.get("/users",(req, res, next)=>{
    console.log("res 1")
   next()
})

app.get("/users",(req, res, next)=>{
    next()
})

app.get("/users",(req, res, next)=>{
    res.send("finally got the responce")
})

//listen to the port
app.listen(7777, ()=>{
    console.log("Server is successfully listening on port num 7777-1")
})