/* In this controller we implement the endpoints understood as webhooks
(either for the ecommerce or for the client events) */
import { Request, Response } from 'express';
import { handleWincaveEvent } from '../services/provider.service';
import { Logger, catchAsync } from 'conexa-core-server';


/* This webhook is called when an order status is updated by the client */
const eventsWebhook = catchAsync(async (req: Request, res: Response) => {
  const { sessionId, username } = req.query;
  Logger.info(`New Webhook Incomming from: ${username}`);
  
  await handleWincaveEvent(sessionId?.toString() ?? '');

  return res.json({
    success: true,
  });
});

export default {
  eventsWebhook,
};


