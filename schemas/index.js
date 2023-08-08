const schemaFavorite = require("./update-favorite-schema");
const schemaContact = require("./validate-contacts-schema");
const  {loginSchema,  registerSchema} = require("./register-and-login-schemas");

module.exports = {
  schemaContact,
  schemaFavorite,
  loginSchema,
  registerSchema
};
