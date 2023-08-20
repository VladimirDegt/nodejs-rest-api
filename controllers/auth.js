const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const gravatar = require("gravatar");
const Jimp = require("jimp");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs/promises");
const User = require("../models/user");
const ctrlWrapper = require("../utils/ctrl-wrapper");
const HttpError = require("../utils/http-error");
const sendEmail = require("../utils/sendEmail");

const { SECRET_KEY, BASE_URL } = process.env;
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;

  const createHashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: createHashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    from: "vladimirdegtyarev@meta.ua",
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}" rel="noopener noreferrer">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  if (newUser) {
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
    return;
  }
  throw HttpError(404);
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (user) {
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
    res.json({ message: "Verification successful" });
    return;
  }
  throw HttpError(404, { message: "User not found" });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email is wrong");
  }
  if (user.verify) {
    res.status(400).json({ message: "Verification has already been passed" });
    return;
  }

  const verifyEmail = {
    to: email,
    from: "vladimirdegtyarev@meta.ua",
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}" rel="noopener noreferrer">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({ message: "Verification email sent" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    avatarURL: user.avatarURL,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;

  res.json({
    avatarURL,
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw HttpError(401);
  }
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "Logout success",
  });
};

const updateFieldSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw HttpError(401);
  }

  const updateUser = await User.findByIdAndUpdate(_id, { subscription });
  if (updateUser) {
    const user = await User.findById(_id);
    res.json(user);
  }
};

const updateFieldAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname, size } = req.file;

  const maxSizeFile = 3 * 1024 * 1024;
  if (size > maxSizeFile) {
    throw HttpError(401, "File size exceeds the maximum limit (3MB).");
  }

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  try {
    const file = await Jimp.read(tempUpload);
    const avatarNewSize = await file.cover(
      250,
      250,
      Jimp.HORIZONTAL_ALIGN_CENTER
    );
    await avatarNewSize.writeAsync(tempUpload);
    await fs.rename(tempUpload, resultUpload);
  } catch (error) {
    await fs.unlink(tempUpload);
    // яку тут помилку викидати? може 500?
    throw HttpError(404);
  }

  const avatarURL = path.join("avatars", filename);

  const user = await User.findById(_id);
  if (!user) {
    throw HttpError(401);
  }

  const updateUser = await User.findByIdAndUpdate(_id, { avatarURL });
  if (updateUser) {
    const user = await User.findById(_id);
    res.json({ avatarURL: user.avatarURL });
  }
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateFieldSubscription: ctrlWrapper(updateFieldSubscription),
  updateFieldAvatar: ctrlWrapper(updateFieldAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
