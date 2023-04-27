import express, { Router } from 'express';
import { validateMiddleware } from 'conexa-core-server';
import validations from '../validations/provider.validation';
import paymentAppController from '../controllers/payment-app.controller';

const router: Router = express.Router();

router.post('/quotation', paymentAppController.getQuotation);
router.post(
  '/create-payment-intent',
  validateMiddleware(validations.intentPayment),
  paymentAppController.createPaymentIntent,
);

export default router;
