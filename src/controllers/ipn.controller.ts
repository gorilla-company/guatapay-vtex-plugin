/* In this controller we implement the endpoints understood as webhooks
(either for the ecommerce or for the client events) */
import { Request, Response } from 'express';
import { catchAsync } from 'conexa-core-server';

/* This webhook is called when an order status is updated by the client */
const eventsWebhook = catchAsync(async (_req: Request, res: Response) => {
  return res.json({
    success: true,
  });
});

export default {
  eventsWebhook,
};
