const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

//Create API to add users ie /signup
app.post("/signup", async (req, res) => {
  //console.log("reqbody", req.body);

  try {
    // validate signup data
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // encrypt password
    const passwordHash = await bcrypt.hash(password, 10);
    //console.log("passwordHash", passwordHash)

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(500).send("Error saving the repsonce " + err.message);
  }
});

//Login api

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const ispasswordValid = await bcrypt.compare(password, user.password);

    if (ispasswordValid) {
      // create JWT
      const token = await jwt.sign({ _id: user._id }, "Prash@123", {
        expiresIn: "1d"
      });
      console.log("token: ", token);

      // send the cokkies
      res.cookie("tokencookie", token, {expires: new Date(Date.now() + 8 * 3600000)});

      res.send("Logged in sucessuly !!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

// get profie api

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send("Error" + err.message);
  }
});

//send connection request

app.post("/sendConnectionRequest", userAuth, async(req, res, next)=>{

  const user = req.user
  res.send(user.firstName + " sent connection request  !!!")
})



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
    res.send({ message: "user deleted succefully", data: user });
  } catch (err) {
    res.status(400).send("somwthing went wrong");
  }
});

//Update user

app.patch("/user/:userId", async (req, res) => {
  const userId = req?.params?.userId;
  const data = req.body;
  console.log("datacheck", data.skills);

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );

    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed");
    }

    //added this validation at schema level, hecnec commenting

    // if(data.skills && data.skills.length > 10){
    //     throw new Error("Skills cannot be more than 10")
    // }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    console.log("user", user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong, " + err.message);
  }
});

app.get("/trytest", async (req, res) => {
  try {
    const users = await User.find({ $where: "this.age==35" });
    res.send({ message: "users fetched successfully", users });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

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
