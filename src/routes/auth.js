const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validate");
const bcrypt = require("bcrypt");
const User = require("../models/user");



//Create API to add users ie /signup
authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const ispasswordValid = await user.validatePassword(password)

    if (ispasswordValid) {
      // create JWT
      const token = await user.getJWT();

      console.log("token: ", token);

      // send the cokkies
      res.cookie("tokencookie", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("Logged in sucessuly !!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});


module.exports = authRouter