const mongoose = require("mongoose");

const validator = require("validator");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 100,
      index: true
    },
    lastName: {
      type: String,
      minLength: 4,
      maxLength: 100,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [
        {
          validator: async function (value) {
            const user = await mongoose.models.User.findOne({ emailId: value });

            if (!user) return true;

            return user._id.toString() === this._id.toString();
          },
          message: "Email already exists",
        },
        {
          validator: function (value) {
            return validator.isEmail(value);
          },
          message: "Invalid email id",
        },
      ],

      trim: true,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter Storng passsword" + value);
        }
      },
    },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://sclpa.com/about-us/dummy-img-1/",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo url not valid" + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is default value",
    },
    skills: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.length <= 10;
        },
        message: "Skills cannot add more than 10",
      },
    },
  },
  { timestamps: true },
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "Prash@123", {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passswordINputByuser) {
  const user = this;

  const passwordHash = user.password;

  const ispasswordValid = await bcrypt.compare(
    passswordINputByuser,
    passwordHash,
  );

  return ispasswordValid;
};

userSchema.index({firstName: 1, lastName:1})

// model name starts with capitle  case
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
