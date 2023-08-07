const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleMongooseError = require("../utils/handleMongooseError");

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailPattern,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().min(6).required().message({
    "any.required": "missing field password",
    "string.min": "password length must be at least 6 characters long",
  }),
  email: Joi.string().pattern(emailPattern).required().messages({
    "any.required": "missing field email",
    "string.pattern": "email not valid",
  }),
  subscription: Joi.string().valid("starter", "pro", "business").messages({
    // "any.required": "missing field subscription",
  }),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required().message({
    "any.required": "missing field password",
    "string.min": "password length must be at least 6 characters long",
  }),
  email: Joi.string().pattern(emailPattern).required().messages({
    "any.required": "missing field email",
    "string.pattern": "email not valid",
  }),
});

const schemas = {
  loginSchema,
  registerSchema,
};

const User = model("user", userSchema);

module.export = { User, schemas };
