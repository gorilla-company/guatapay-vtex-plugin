import { ITransaction } from '@/interfaces/transaction.interface';

export const transactionMock: ITransaction = {
  username: 'andres@conexa.ai',
  apiKey: '123',
  orderId: '123',
  vtexPaymentId: 'eef1df2b-3af4-4dcf-baba-d87s020b46a14',
  vtexTransactionId: '123',
  vtexCallbackUrl: 'url',
  reference: 'reference',
  vtexStatus: 'undefined',
  guatapayStatus: 'pending',
  nsu: 'nsu',
  tid: 'tid',
  authorizationId: '123',
  guatapayPaymentId: '123',
  addressAccount: {
    id: '123',
    direction: '123',
  },
  money: {
    cryptoCurrency: 'btc',
    fiatCurrency: 'COP',
    cryptoAmount: 0.1,
    fiatAmount: '120000',
    feesPayedInCrypto: 1,
    feesPayedInFiat: 1,
    amountPayed: 1,
    fullInputAmount: '1',
  },
};
