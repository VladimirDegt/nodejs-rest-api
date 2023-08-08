const bcrypt = require("bcrypt");
const User = require("../models/user");
const HttpError = require("../utils/http-error");
const ctrlWrapper = require("../utils/ctrl-wrapper");

const register = async (req, res)=>{
  const createHashPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await User.create({...req.body, password: createHashPassword});
  if(newUser){
    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
    return
  }
  throw HttpError(404, "Not found");
};

const login = async(req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if(!user){
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = bcrypt.compare(password, user.password);
  if(!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const token = "12313213.234234234.23423423";
  res.status(202).json({
    token
  }); 
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
}