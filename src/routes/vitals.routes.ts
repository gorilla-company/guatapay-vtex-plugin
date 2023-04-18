import express, { Router } from 'express';
import { welcome, dbCheck } from '../controllers/vitals.controller';

const router: Router = express.Router();

router.get('/', welcome);
router.get('/dbCheck', dbCheck);

export default router;
