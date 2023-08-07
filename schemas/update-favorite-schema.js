const Joi = require("joi");

const schema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
    'boolean.base': 'field favorite must be a boolean',
  }),
});

const validateFavorite = ({ favorite }) => {
  const { error } = schema.validate({
    favorite,
  });
  return error;
};

module.exports = validateFavorite;
