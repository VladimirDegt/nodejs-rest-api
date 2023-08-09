const jwt = require("jsonwebtoken");
const HttpError = require("../utils/http-error");
const User = require("../models/user");
const {SECRET_KEY} = process.env;

const authenticate = async (req, res, next) => {
  const {authorization=''} = req.headers;
  const [bearer, token] = authorization.split(" ");
  if(bearer !== "Bearer") {
    next(HttpError(401))
  }
  try {
    const {id} = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if(!user){
      next(HttpError(401))
    }
    req.user = user;
  } catch {
    next(HttpError(401))
  }
  next()
};

module.exports = authenticate;