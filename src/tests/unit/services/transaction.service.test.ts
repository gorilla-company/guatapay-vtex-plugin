import setupTestDB from '../../setupTestDB';
import Transaction from '../../../models/Transaction.model';

import { createTransaction, getTransactionsCount, findTransaction } from '../../../services/database/transaction.service';
import { transactionMock } from '../../mocks/database/transaction';




describe('Update or create Transaction', () => {
  setupTestDB();
  test('should get the number of transactions in db', async () => {
    await Transaction.deleteMany();
    await createTransaction(transactionMock)
    
    // Get number of transactions.
    const getTransactionCount = await getTransactionsCount();

    // We expect to get only 1 transaction in db
    expect(getTransactionCount).toEqual(1);
    
  });

  test('should create a new transaction', async () => {
    await Transaction.deleteMany();
    const newTransaction = await createTransaction(transactionMock)
    
    // We expect to get only 1 transaction in db
    expect(newTransaction.orderId).toEqual(transactionMock.orderId);
    
  });
  test('should find an existing transaction', async () => {
    // Create transaction
    await createTransaction(transactionMock)
    // find transaction
    const transaction = await findTransaction({orderId: transactionMock.orderId})
    
    // We expect to get same transaction we just create
    expect(transaction!.orderId).toEqual(transactionMock.orderId);
    
  });
});
