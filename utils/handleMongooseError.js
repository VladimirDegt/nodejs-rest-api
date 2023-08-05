const HttpError = require("./http-error");

const handleMongooseError = (error, _, next) => {
  next(HttpError(400, error.message));
};

module.exports = handleMongooseError;
