import express, { Router } from 'express';
import paymentAppController from '../controllers/payment-app.controller';

const router: Router = express.Router();

router.post('/quotation', paymentAppController.getQuotation);
router.post('/create-payment-intent', paymentAppController.createPaymentIntent);

export default router;
