const mongoose = require("mongoose");
const { findById } = require("./user");

const connectioRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User" //buimding reference to User model
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    status:{
        type: String,
        required: true,
        enum:{
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        }
    }
},
{
    timestamps: true
}
)

connectioRequestSchema.index({fromUserId: 1, toUserId: 1})

connectioRequestSchema.pre("save", async function () {
  const connectionRequest = this;

  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You cannot send connection request to yourself");
  }
});

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectioRequestSchema)
module.exports= ConnectionRequestModel