import setupTestDB from '../../setupTestDB';
import Transaction from '../../../models/Transaction.model';
import { transactionMock } from '../../mocks/database/transaction';

describe('Transaction Schema', () => {
  setupTestDB();

  test('should create a new transaction with the data from the transactionMock object using the create transaction method', async () => {
    const transaction = await Transaction.create(transactionMock);
    expect(transaction.username).toBe(transactionMock.username);
    expect(transaction.apiKey).toBe(transactionMock.apiKey);
    expect(transaction.orderId).toBe(transactionMock.orderId);
    expect(transaction.vtexPaymentId).toBe(transactionMock.vtexPaymentId);
    expect(transaction.vtexTransactionId).toBe(transactionMock.vtexTransactionId);
    expect(transaction.vtexCallbackUrl).toBe(transactionMock.vtexCallbackUrl);
    expect(transaction.reference).toBe(transactionMock.reference);
    expect(transaction.vtexStatus).toBe(transactionMock.vtexStatus);
    expect(transaction.guatapayStatus).toBe(transactionMock.guatapayStatus);
    expect(transaction.nsu).toBe(transactionMock.nsu);
    expect(transaction.tid).toBe(transactionMock.tid);
    expect(transaction.authorizationId).toBe(transactionMock.authorizationId);
    expect(transaction.guatapayPaymentId).toBe(transactionMock.guatapayPaymentId);
    expect(transaction.addressAccount.id).toBe(transactionMock.addressAccount.id);
    expect(transaction.addressAccount.direction).toBe(transactionMock.addressAccount.direction);
    expect(transaction.money.amountPayed).toBe(transactionMock.money.amountPayed);
    expect(transaction.money.cryptoAmount).toBe(transactionMock.money.cryptoAmount);
    expect(transaction.money.cryptoCurrency).toBe(transactionMock.money.cryptoCurrency);
    expect(transaction.money.feesPayedInCrypto).toBe(transactionMock.money.feesPayedInCrypto);
    expect(transaction.money.feesPayedInFiat).toBe(transactionMock.money.feesPayedInFiat);
    expect(transaction.money.fiatAmount).toBe(transactionMock.money.fiatAmount);
    expect(transaction.money.fiatCurrency).toBe(transactionMock.money.fiatCurrency);
    expect(transaction.money.fullInputAmount).toBe(transactionMock.money.fullInputAmount);
  });
});
