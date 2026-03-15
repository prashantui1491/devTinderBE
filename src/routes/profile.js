const express = require("express");

const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

const { validateEditProfileData, validatePasswordChange } = require("../utils/validate");

const bcrypt = require("bcrypt");

// get profie api

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send("Error" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request ");
    }

    const loggedinUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedinUser[key] = req.body[key]));

    await loggedinUser.save();

    res.json({
      message: `${loggedinUser.firstName}, your profile updated successfully`,
      data: loggedinUser,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// Change password API
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    validatePasswordChange(req);

    const user = req.user;
    const { oldPassword, newPassword } = req.body;

    // Verify old password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new Error("Old password is incorrect");
    }

    // Hash new password
    const hashPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashPassword;
    await user.save();

    res.json({
      message: "Password updated successfully",
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = profileRouter;
