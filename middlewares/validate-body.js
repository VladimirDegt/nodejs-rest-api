const HttpError = require("../utils/http-error");
const validateContacts = require("../utils/validate-contacts-schema");

const validateBodyRequest = () => {
  const inner = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }

    const error = validateContacts(req.body);
    if (error) {
      next(
        HttpError(400, `missing required ${error.details[0].path[0]} field`)
      );
    }
    next();
  };
  return inner;
};

module.exports = validateBodyRequest;
