import express, {Router} from 'express';

const router: Router = express.Router();

import {welcome, dbCheck} from '../controllers/vitals.controller';

router.get('/', welcome);
router.get('/dbCheck', dbCheck);

export default router;
