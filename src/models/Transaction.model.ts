import mongoose from 'mongoose';
import { ITransaction } from '../interfaces/transaction.interface';

const TransactionSchema = new mongoose.Schema<ITransaction>(
  {
    username: { type: String },
    apiKey: { type: String },
    orderId: { type: String, unique: true },
    vtexTransactionId: { type: String },
    vtexPaymentId: { type: String },
    vtexCallbackUrl: { type: String },
    guatapayPaymentId: { type: String, default: null },
    reference: { type: String },
    status: { type: String },
    nsu: { type: String },
    tid: { type: String },
    authorizationId: { type: String },
    addressAccount: {
      id: { type: String, default: null },
      direction: { type: String, default: null },
    },
    money: {
      cryptoCurrency: { type: String, default: null },
      cryptoAmount: { type: String, default: null },
      feesPayedInCrypto: { type: Number, default: null },
      fiatCurrency: { type: String },
      fiatAmount: { type: String },
      feesPayedInFiat: { type: Number, default: null },
      amountPayed: { type: Number, default: null },
      fullInputAmount: { type: String, default: null },
    },
  },
  {
    timestamps: true,
  },
);

const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
