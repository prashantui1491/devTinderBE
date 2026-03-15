const express = require("express")

const requestRouter = express.Router()

const { userAuth } = require("../middlewares/auth");

//send connection request

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res, next) => {
  const user = req.user;
  res.send(user.firstName + " sent connection request  !!!");
});


module.exports = requestRouter