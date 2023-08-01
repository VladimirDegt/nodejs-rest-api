const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\d{6,12}$/)
    .required(),
});

const validateContacts = (name, email, phone) => {
  const { error } = schema.validate({ name, email, phone });

  return error;
};

module.exports = validateContacts;
