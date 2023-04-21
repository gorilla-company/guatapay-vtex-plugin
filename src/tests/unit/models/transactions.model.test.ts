import setupTestDB from '../../setupTestDB';
import Transaction from '../../../models/Transaction.model';
import { transactionMock } from '../../mocks/database/transaction';

describe('Transaction Schema', () => {
  setupTestDB();

  test('should create a new transaction with the data from the transactionMock object using the createtransaction method', async () => {
    const transaction = await Transaction.create(transactionMock);
    expect(transaction.apiKey).toBe(transactionMock.apiKey);
    expect(transaction.orderId).toBe(transactionMock.orderId);
    expect(transaction.status).toBe(transactionMock.status);
    expect(transaction.vtexPaymentId).toBe(transactionMock.vtexPaymentId);
  });
});
