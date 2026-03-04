const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength:4,
    maxLength: 100
  },
  lastName: {
    type: String,
    minLength:4,
    maxLength: 100
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: async function (value) {
        const user = await mongoose.models.User.findOne({ emailId: value });
        return !user;
      },
      message: "Email already exists",
    },
    trim:true
  },
  password: {
    type: String,
    required: true,
  },
  age: { type: Number, min: 18 },
  gender: { type: String,
    validate(value){
        if(!["male", "female", "others"].includes(value)){
            throw new Error("Gender not valid")
        }
    }
   },
  photoUrl: {
    type: String,
    default: "https://sclpa.com/about-us/dummy-img-1/",
  },
  about: {
    type: String,
    default: "This is default value",
  },
  skills: {
    type: [String],
  },
}, {timestamps: true});

// model name starts with capitle  case
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
