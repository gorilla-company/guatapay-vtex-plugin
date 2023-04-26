import { Status, Currency } from 'guatapay-sdk/dist/interfaces/client.interfaces';

type GuatapayStatus = Status | 'init';

export interface ITransactionInit {
  username: string;
  apiKey: string;
  orderId: string;
  vtexPaymentId: string;
  vtexTransactionId: string;
  vtexCallbackUrl: string;
  reference: string;
  vtexStatus: 'undefined' | 'approved' | 'denied';
  guatapayStatus: GuatapayStatus;
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

export interface IMoney {
  cryptoCurrency: Currency;
  fiatCurrency: string;
  cryptoAmount: number;
  fiatAmount: string;
  feesPayedInCrypto: number;
  feesPayedInFiat: number;
  amountPayed: number;
  fullInputAmount: string;
}
