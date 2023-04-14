import express, { Router } from 'express';
import { decryptRequestMiddleware } from 'conexa-core-server';

import ipnRoute from './ipn.routes';
import vtexRoute from './vtex.routes';
import vitalsRoute from './vitals.routes';
import config from '../config/config';
import paymentAppRoute from './payment-app.routes';

const router = express.Router();
const apiPrefix = `/api/${config.apiVersion}`;
interface IRoute {
  path: string;
  route: Router;
  security?: boolean;
}

const defaultIRoute: IRoute[] = [
  {
    path: `${apiPrefix}/vtex`,
    route: vtexRoute,
  },
  {
    path: `/`,
    route: vitalsRoute,
    security: false,
  },
  {
    path: `${apiPrefix}/ipn`,
    route: ipnRoute,
  },
  {
    path: `${apiPrefix}/payment-app`,
    route: paymentAppRoute,
  },
];

defaultIRoute.forEach((route) => {
  if (route.security) router.use(route.path, decryptRequestMiddleware, route.route);
  else if (!route.security) router.use(route.path, route.route);
});

export default router;
