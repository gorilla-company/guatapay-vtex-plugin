import setupTestDB from '../../setupTestDB';
import Transaction from '../../../models/Transaction.model';
import { transactionMock } from '../../mocks/database/transaction';

describe('Transaction Schema', () => {
  setupTestDB();

  test('should create a new transaction with the data from the transactionMock object using the createtransaction method', async () => {
    const transaction = await Transaction.create(transactionMock);
    expect(transaction.userId).toBe(transactionMock.userId);
    expect(transaction.orderId).toBe(transactionMock.orderId);
    expect(transaction.status).toBe(transactionMock.status);
    expect(transaction.vtexPaymentId).toBe(transactionMock.vtexPaymentId);
    expect(transaction.price).toBe(transactionMock.price);
    expect(transaction.vtexCallbackUrl).toBe(transactionMock.vtexCallbackUrl);
    expect(transaction.urlWindcave).toBe(transactionMock.urlWindcave);
    expect(transaction.transactionId).toBe(transactionMock.transactionId);
    expect(transaction.reference).toBe(transactionMock.reference);
    expect(transaction.merchantReference).toBe(transactionMock.merchantReference);
    expect(transaction.tid).toBe(transactionMock.tid);
  });
});
