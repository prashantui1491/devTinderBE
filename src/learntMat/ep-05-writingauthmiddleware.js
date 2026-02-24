const express = require("express");

const app = express();

const {adminAuth, userAuth} = require('./middlewares/auth')

// Handle auth middleware for admin to handle all Request

app.use("/admin", adminAuth );

// post authorisation send responce to admin

app.get("/admin/getusers",(req, res)=>{
    res.send("data sent")
})

app.delete("/admin/deleteusers",(req, res)=>{
    res.send("deleteduser")
})

app.use("/user", userAuth, (req, res)=>{
    res.send("user responce sent")
})

//listen to the port
app.listen(7777, () => {
  console.log("Server is successfully listening on port num 7777-1");
});
