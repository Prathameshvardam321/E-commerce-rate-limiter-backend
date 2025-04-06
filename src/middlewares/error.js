import httpStatus from 'http-status'
import config from '../config/config.js';
import ApiError from '../utils/ApiError.js';


export const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode ||  httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError( "APP-ERR-CODE", message, statusCode, err.stack);
  }
  next(error);
};


export const errorHandler = (err, req, res, next) => {
  let { statusCode, message, errorCode = "" } = err;
  if (config.ENV === 'production' ) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    errorCode,
    message,
    ...(config.ENV === 'development' && { stack: err.stack }),
  };

  if (config.ENV === 'development') {
    console.log(err);
  }

  res.status(statusCode).send(response);
};


