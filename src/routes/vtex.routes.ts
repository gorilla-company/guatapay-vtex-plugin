import vtexController from '../controllers/vtex.controller';
import express, { Router } from 'express';

const router: Router = express.Router();




router.get('/manifest', vtexController.manifest);
router.get('/payment-methods', vtexController.paymentMethod);
router.post('/payments', vtexController.payment);
router.post('/payments/:payment_id/settlements', vtexController.settlements);
router.post('/payments/:payment_id/cancellations', vtexController.cancellations);
router.post('/payments/:payment_id/refunds', vtexController.refunds);




export default router;