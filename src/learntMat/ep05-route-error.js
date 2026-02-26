const express = require("express");

const app = express();

app.use("/",(err, req, res, next)=>{
    if(err){
        res.status(500).send("Something went wrong")
    }
})

app.get("/getuserdata",(req, res)=>{
    try{
        //logic here
        throw new Error("Random error")
        res.send("data sent successfully")
    }
    catch(err){
        res.status(500).send("Something went wrong, contact support team")
    }

      throw new Error("Random error")
})

//"Wild card route ie "/" keep alwasys towards the end "

app.use("/",(err, req, res, next)=>{
    if(err){
        res.status(500).send("Something went wrong")
    }
})





//listen to the port
app.listen(7777, () => {
  console.log("Server is successfully listening on port num 7777-1");
});
