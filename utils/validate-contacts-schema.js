const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
  gender: Joi.string().valid("male", "female", "other").required(),
  birthday: Joi.string()
    .pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/)
    .required(),
});

const validateContacts = ({
  name,
  email,
  phone,
  favorite,
  gender,
  birthday,
}) => {
  const { error } = schema.validate({
    name,
    email,
    phone,
    favorite,
    gender,
    birthday,
  });

  return error;
};

module.exports = validateContacts;
