const errorHandler = (status, message, statusCode, data = null) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.status = status;
  error.data = data;

  return error;
};

module.exports = errorHandler;