/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { Logger } from 'conexa-core-server';

import config from '../config/config';
import ApiError from '../lib/ApiError';

export const errorConverter = (err: any, _req: Request, _res: Response, next: any) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    let message: string = error.message || `${httpStatus[statusCode]}`;

    // Clean up error message from validation middleware
    message = message.replaceAll('"', '');

    // Creates a code from the error message
    const messageToCode = message.replace(/ /g, '-').toLowerCase();
    error = new ApiError(statusCode, message, messageToCode, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err: ApiError, _req: Request, res: Response, _next: any) => {
  let { statusCode, message } = err;
  const { success, code } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = 'internal-server-error';
  }

  const response = {
    success,
    statusCode,
    message: message || httpStatus[statusCode] || 'Unknown error',
    code: code || undefined,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') Logger.error(err);

  res.status(statusCode).send(response);
};
