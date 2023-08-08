const User = require("../models/user");
const HttpError = require("../utils/http-error");

const checkUniqueEmail = async (req, res, next) => {
  const {email} = req.body;
  const user = await User.findOne({email});
  if(user){
    next(HttpError(409, "Email already in use"));
  }
  next();
}

module.exports = checkUniqueEmail;