const express = require("express");
const { userAuth } = require("../middlewares/auth");

const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl about skils";

userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedinUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    //}).populate("fromUserId", ["firstName", "lastName", "photoUrl", "about", "skils"])

    // console.log("loggedinUser", loggedinUser);

    // console.log("connectionRequest", connectionRequest);

    res.status(200).json({
      message: "Data fetched successfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("Error: ", +err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }

      return row.fromUserId;
    });

    res.json({ data: data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = userRouter;
