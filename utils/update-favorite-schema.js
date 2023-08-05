const Joi = require("joi");

const schema = Joi.object({
  favorite: Joi.boolean().required(),
});

const validateFavorite = ({ favorite }) => {
  const { error } = schema.validate({
    favorite,
  });

  return error;
};

module.exports = validateFavorite;
