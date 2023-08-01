const httpError = (status, message) => {
  const error = new Error();
  error.status = status;

  return error;
};

module.exports = httpError;
