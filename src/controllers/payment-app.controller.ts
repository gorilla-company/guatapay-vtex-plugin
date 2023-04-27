import { catchAsync } from 'conexa-core-server';
import { Request, Response } from 'express';
import guatapayServices from '../services/provider.service';

const getQuotation = catchAsync(async (req: Request, res: Response) => {
  const { body } = req;
  const { currency, amount } = body;
  const response = await guatapayServices.getQuotation(currency, amount);
  res.status(200).send(response);
});

const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const { body } = req;
  const { currency, paymentId } = body;
  const response = await guatapayServices.createIntentPayment(currency, paymentId);
  res.status(200).send(response);
});

export default {
  getQuotation,
  createPaymentIntent,
};
