const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email id");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter strong password");
  }
};

const validateEditProfileData = (req)=>{
  const allowedEditeFields = ["firstName", "lastName","age", "gender", "photoUrl", "about", "skills"]

  const isAllowedEdit  = Object.keys(req.body).every(field => allowedEditeFields.includes(field))

  return isAllowedEdit



}

module.exports = {validateSignupData, validateEditProfileData}