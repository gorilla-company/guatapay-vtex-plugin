import { ITransaction } from '@/interfaces/transaction.interface';

export const transactionMock: ITransaction = {
  username: 'conexa@user',
  apiKey: '123',
  orderId: '123',
  vtexPaymentId: '123',
  vtexTransactionId: '123',
  vtexCallbackUrl: 'url',
  reference: 'reference',
  status: 'pending',
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
    fiatAmount: '1200',
    feesPayedInCrypto: 1,
    feesPayedInFiat: 1,
    amountPayed: 1,
    fullInputAmount: '1',
  },
};
