import { Logger } from 'conexa-core-server';
import { Response, Request } from 'express';
import { getTransactionsCount } from '../services/database/transaction.service';

export const welcome = async (_req: any, res: Response) => {
  Logger.info('Hit welcome endpoint');
  res.status(200).send('Hello World - Windcave - Vtex');
};

export const dbCheck = async (_req: Request, res: Response) => {
  try {
    Logger.info('Hit db check endpoint');
    const ordersCount = await getTransactionsCount();
    Logger.info(`Orders count: ${ordersCount}.`);

    res.send(`DBU working normally`);
  } catch (error) {
    Logger.error(error);
    res.status(500).send('There was a problem with the DB');
  }
};
