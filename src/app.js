const express = require("express");
const connectDb = require("./config/database");

const app = express();

const User = require("./models/user");

app.use(express.json());

//Create API to add users ie /signup
app.post("/signup", async (req, res) => {
  //console.log("reqbody", req.body);

  try {
    const user = new User(req.body);
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(500).send("Error saving the repsonce" + err.message);
  }
});

//get api: get user single user

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  const userID = req.body._id;

  try {
    //const user = await User.find({ emailId: userEmail });
    //const user = await User.findOne({ emailId: userEmail });
    const userbyID = await User.findById({ _id: userID });

    if (!userbyID) {
      res.status(400).send("user not found");
    } else {
      res.send(userbyID);
    }

    // if (user.length === 0) {
    //   res.status(404).send("user not found");
    // } else {
    //   res.send(user);
    // }
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

// get all user data

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// delete api

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send({message:"user deleted succefully",data:user});
  } catch (err) {
    res.status(400).send("somwthing went wrong");
  }
});

//Update user

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body

  try {
    const user = await User.findByIdAndUpdate({ _id: userId },data, {returnDocument: "before",runValidators: true});
    console.log("user", user)
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

app.get("/trytest",async(req, res)=>{
    try{
        const users = await User.find({$where: 'this.age==35'})
        res.send({message: "users fetched successfully", users})
    }
    catch(err){
        res.status(400).send(err.message)
    }
})


connectDb()
  .then(() => {
    //first connect to db then listen to the port
    console.log("Databseconnection established successfuly ...");
    //listen to the port
    app.listen(7777, () => {
      console.log("Server is successfully listening on port num 7777");
    });
  })
  .catch((err) => {
    console.log("Database connection failed");
  });
