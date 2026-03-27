const express = require("express");
const connectDb = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/authRouter")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/reuqest")
const userRouter = require("./routes/user")

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter)


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
