import express, { Router } from 'express';
import ipnController from '../controllers/ipn.controller';

const router: Router = express.Router();

// Webhooks Events
router.get('/', ipnController.eventsWebhook);

export default router;
