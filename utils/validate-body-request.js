const HttpError = require("../utils/http-error");
const validateContacts = require("../utils/validate-contacts");

const validateBodyRequest = (req) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  const error = validateContacts(req.body);
  if (error) {
    throw HttpError(400, `${error.message}`);
  }
};

module.exports = validateBodyRequest;
