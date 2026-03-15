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

const validatePasswordChange = (req) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new Error("Old password and new password are required");
  }

  else if(oldPassword === newPassword){
    throw new Error("old and new password are same")
  }
  
  else if (!validator.isStrongPassword(newPassword)) {
    throw new Error("New password must be strong");
  }
}

module.exports = {validateSignupData, validateEditProfileData, validatePasswordChange}