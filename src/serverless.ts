import mongoose from 'mongoose';
import { Handler, Context } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import { Server } from 'http';
import app from './app';
import config from './config/config';

let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    // configure mongoose

    await mongoose.connect(config.mongoose.url);
    cachedServer = createServer(app);
  }
  return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
  const server = await bootstrapServer();
  return proxy(server, event, context, 'PROMISE').promise;
};
