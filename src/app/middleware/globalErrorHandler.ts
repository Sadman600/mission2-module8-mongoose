// import { path } from 'path';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSource } from '../interface/error';
import envFile from '../config';
import { handleZodError } from '../error/handleZodError';
import handleMongooseError from '../error/handleMongooseError';
import handleCastError from '../error/handleCastError';
import handleDuplicateError from '../error/handleDuplicateError';
import AppError from '../error/AppError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiErr = handleZodError(error);
    statusCode = simplifiErr?.statusCode;
    message = simplifiErr?.message;
    errorSource = simplifiErr?.errorSource;
  } else if (error?.name === 'ValidationError') {
    const simplifiErr = handleMongooseError(error);
    statusCode = simplifiErr?.statusCode;
    message = simplifiErr?.message;
    errorSource = simplifiErr?.errorSource;
  } else if (error?.name === 'CastError') {
    const simplifiErr = handleCastError(error);
    statusCode = simplifiErr?.statusCode;
    message = simplifiErr?.message;
    errorSource = simplifiErr?.errorSource;
  } else if (error?.code === 11000) {
    const simplifiErr = handleDuplicateError(error);
    statusCode = simplifiErr?.statusCode;
    message = simplifiErr?.message;
    errorSource = simplifiErr?.errorSource;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorSource = [
      {
        path: '',
        message: error?.message,
      },
    ];
  } else if (error instanceof Error) {
    statusCode = 400;
    message = error?.message;
    errorSource = [
      {
        path: '',
        message: error?.message,
      },
    ];
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: envFile.NODE_ENV === 'development' ? error?.stack : null,
    error,
    // error: error,
  });
  //   next();
};

export default globalErrorHandler;
