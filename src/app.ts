import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import httpStatus from 'http-status';
import { configure, HttpLogger } from 'conexa-core-server';

import { errorConverter, errorHandler } from './middlewares/error.middleware';
import config from './config/config';
import routes from './routes/index.routes';
import ApiError from './lib/ApiError';

// Initialize Conexa Core Server
configure({
  secretKey: config.cryptojsKey,
  securityBypass: config.env !== 'production',
  debug: config.env !== 'production',
  env: config.env,
});

const app = express();

if (config.env !== 'test') {
  app.use(HttpLogger.successHandler);
  app.use(HttpLogger.errorHandler);
}

// Set security HTTP headers
app.use(helmet());

// Enable cors
app.use(cors());
app.options('*', cors());

// Parse json request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Sanitize request data
app.use(xss());
app.use(ExpressMongoSanitize());

// Gzip compression
app.use(compression());

// V1 api routes
app.use(routes);

// Expose public folder
app.use('/public', express.static('src/public'));

// Send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
