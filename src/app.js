const express = require("express");
const connectDb = require("./config/database")

const app = express();

const User = require("./models/user")

//Create API to add users ie /signup
app.post("/signup", async (rreq, res)=>{
    const userObj = {
        firstName : "aarav",
        lastName : "prashant",
        emailId: "aarav@prashant.com",
        passowrd: "aarav123",
        age: 6,
        gender: "male"
    }
try{
    const user = new User(userObj)
    await user.save()
    res.send("user added successfully")

} catch(err){
    res.status(500).send("Error saving the repsonce", + err.message)
}
    
})




connectDb().then(()=>{
    //first connect to db then listen to the port
    console.log("Databseconnection established successfuly ...")
    //listen to the port
    app.listen(7777, () => {
    console.log("Server is successfully listening on port num 7777");
});
}).catch((err)=>{
    console.log("Database connection failed")
})




