const adminAuth = (req, res, next) => {
    console.log("Admin Authorisation checking ....")
  const token = "xyz1";
  const isAuthorisation = token === "xyz";

  if (!isAuthorisation) {
    res.status(401).send("Unauthorisaed user");
  } else {
    next();
  }
}

const userAuth = (req, res, next) => {
    console.log("user Authorisation checking ....")
  const token = "xyz";
  const isAuthorisation = token === "xyz";

  if (!isAuthorisation) {
    res.status(401).send("Unauthorisaed user");
  } else {
    next();
  }
}

module.exports = {
    adminAuth,
    userAuth

}