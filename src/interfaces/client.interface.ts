export type Currency = 'btc' | 'usdc' | 'lightning-btc';

export interface ILogin {
  user: {
    _id: string;
    username: string;
    role: string;
    secretHashes: string[];
    __v: number;
  };
  authToken: string;
}

export interface IMarketQuoteResponse {
  fiat: {
    amount: number;
    currency: string;
  };
  crypto: {
    amount: number;
    currency: string;
    network: string;
  };
  buyerFees: [
    {
      expressedInCrypto: string;
      currency: string;
    },
    {
      expressedInFiat: number;
      currency: string;
    },
  ];
  expires_in: string;
}
