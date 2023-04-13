import { Status, Currency } from './client.interface';

export interface ITransactionInit {
  username: string;
  apiKey: string;
  orderId: string;
  vtexPaymentId: string;
  vtexTransactionId: string;
  reference: string;
  status: Status;
  nsu: string;
  tid: string;
  authorizationId: string;
  money: {
    fiatCurrency: string;
    fiatAmount: string;
  };
}

export interface ITransaction extends ITransactionInit {
  guatapayPaymentId: string;
  addressAccount: {
    id: string;
    direction: string;
  };
  money: IMoney;
}

interface IMoney {
  cryptoCurrency: Currency;
  fiatCurrency: string;
  cryptoAmount: number;
  fiatAmount: string;
  feesPayedInCrypto: number;
  feesPayedInFiat: number;
  amountPayed: number;
  fullInputAmount: string;
}
