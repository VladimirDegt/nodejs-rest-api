const HttpError = require("../utils/http-error");
const validateFieldFavorite = require("../utils/update-favorite-schema");

const validateFavoriteRequest = () => {
  const inner = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing field favorite");
    }

    const error = validateFieldFavorite(req.body);
    if (error) {
      next(
        HttpError(400, `missing required ${error.details[0].path[0]} field`)
      );
    }
    next();
  };
  return inner;
};

module.exports = validateFavoriteRequest;
