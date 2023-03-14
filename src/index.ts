import { Logger } from 'conexa-core-server';
import mongoose from 'mongoose';
import app from './app';
import config from './config/config';

let server: any;
mongoose.connect(config.mongoose.url).then(() => {
  Logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    Logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      Logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
  Logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  Logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
