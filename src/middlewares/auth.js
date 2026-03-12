const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // get token from cookie

    const { tokencookie } = req.cookies;
    if (!tokencookie) {
      throw new Error("Invalid token from userAuth");
    }

    const decodeObj = await jwt.verify(tokencookie, "Prash@123");

    const { _id } = decodeObj;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(400).send("Err: " + err.message);
  }
};

module.exports = {
  userAuth,
};
