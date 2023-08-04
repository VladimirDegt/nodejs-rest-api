const HttpError = require("../utils/http-error");
const validateContacts = require("../utils/validate-contacts-schema");

const validateBodyRequest = () => {
  const inner = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }

    const { name, email, phone } = req.body;
    switch (undefined) {
      case name:
        next(HttpError(400, `missing required name field`));
      case email:
        next(HttpError(400, `missing required email field`));
      case phone:
        next(HttpError(400, `missing required phone field`));
    }

    const error = validateContacts(req.body);
    if (error) {
      next(HttpError(400, `${error.message}`));
    }
    next();
  };
  return inner;
};

module.exports = validateBodyRequest;
