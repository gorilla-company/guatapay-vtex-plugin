import CronJob from 'cron';
import { Logger } from 'conexa-core-server';
import { findAllPendingTransactions } from '../services/database/transaction.service';
import guatapayService from '../services/provider.service';
import config from '../config/config';

export const guatapayPaymentJob = new CronJob.CronJob('*/1 * * * *', async () => {
  Logger.info('----|  Running Guatapay Payment Status Cron  |----');
  const pendingTransactions = await findAllPendingTransactions();

  if (pendingTransactions.length === 0) return Logger.info('No pending transactions');

  // eslint-disable-next-line no-restricted-syntax
  for (const transaction of pendingTransactions) {
    // eslint-disable-next-line no-await-in-loop
    await guatapayService.updatePayment(transaction.vtexPaymentId);
  }

  Logger.info('----|  Finishes Guatapay Payment Status Cron  |----');
  return true;
});

export default function initCron() {
  if (config.env === 'test') return;
  Logger.info('----|  Running Crons  |----');
  try {
    guatapayPaymentJob.start();
  } catch (error) {
    Logger.error('Error in cron jobs');
    // eslint-disable-next-line no-console
    console.log(error);
  }
}
