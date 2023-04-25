// import { Status, Currency } from 'guatapay-sdk/dist/interfaces/client.interfaces';

// export interface ILogin {
//   user: {
//     _id: string;
//     username: string;
//     role: string;
//     secretHashes: string[];
//     __v: number;
//   };
//   authToken: string;
// }

// export interface IMarketQuoteResponse {
//   fiat: {
//     amount: number;
//     currency: string;
//   };
//   crypto: {
//     amount: number;
//     currency: string;
//     network: string;
//   };
//   buyerFees: [
//     {
//       expressedInCrypto: string;
//       currency: string;
//     },
//     {
//       expressedInFiat: number;
//       currency: string;
//     },
//   ];
//   expires_in: string;
// }

// export interface IPaymentIntentResponse {
//   merchantId: string;
//   addressAccountId: string;
//   addressAccount: string;
//   inputCurrency: Currency;
//   outputCurrency: string;
//   inputAmount: number;
//   outputAmount: number;
//   feesPayedInCrypto: number;
//   feesPayedInFiat: number;
//   amountPayed: number;
//   tradeOrderId: number;
//   status: Status;
//   lightningInvoice: string;
//   createdAt: string;
//   paymentId: string;
//   expiresIn: string;
//   qrCodeData: {
//     qrCodeUri: string;
//     qrCodeLocation: string;
//   };
//   fullInputAmount: string;
// }

// export interface IPaymentDataResponse {
//   _id: string;
//   merchantId: string;
//   addressAccountId: string;
//   addressAccount: string;
//   inputCurrency: string;
//   outputCurrency: string;
//   inputAmount: number;
//   outputAmount: number;
//   feesPayedInCrypto: number;
//   feesPayedInFiat: number;
//   amountPayed: number;
//   tradeOrderId: number;
//   status: Status;
//   lightningInvoice: string;
//   createdAt: string;
//   __v: number;
// }
