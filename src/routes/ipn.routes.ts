import ipnController from '../controllers/ipn.controller';
import express, { Router } from 'express';
import { validateMiddleware as validate } from 'conexa-core-server';
import validations from '../validations/provider.validation';
const router: Router = express.Router();

// Webhooks Events
router.get('/',validate(validations.sessionParams), ipnController.eventsWebhook);

export default router;
