import express, { Router } from 'express';
import vtexController from '../controllers/vtex.controller';

const router: Router = express.Router();

router.get('/manifest', vtexController.manifest);
router.get('/payment-methods', vtexController.paymentMethods);
router.post('/payments', vtexController.payments);
router.post('/payments/:payment_id/settlements', vtexController.settlements);
router.post('/payments/:payment_id/cancellations', vtexController.cancellations);
router.post('/payments/:payment_id/refunds', vtexController.refunds);

export default router;
