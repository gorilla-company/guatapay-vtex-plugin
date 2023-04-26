import { Logger } from 'conexa-core-server';
import { Status } from 'guatapay-sdk/dist/interfaces/client.interfaces';
import Transaction from '../../models/Transaction.model';
import { ITransactionInit } from '../../interfaces/transaction.interface';

export const getTransactionsCount = () => {
  try {
    return Transaction.countDocuments({});
  } catch (error) {
    Logger.error(error);
    throw error;
  }
};

export const createTransaction = async (data: ITransactionInit) => new Transaction(data).save();

export const findTransaction = async (condition: any) => Transaction.findOne(condition);

export const findAllPendingTransactions = async () => {
  const PENDING_STATUS: Status = 'pending';
  return Transaction.find({ guatapayStatus: PENDING_STATUS });
};
