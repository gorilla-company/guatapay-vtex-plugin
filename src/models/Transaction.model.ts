import { ITransaction } from '../interfaces/transaction.interface';
import mongoose from 'mongoose';





const TransactionSchema = new mongoose.Schema<ITransaction>(
    {
        userId:{type: String},
        orderId: {type: String, unique:true},
        status: {type: String},
        vtexPaymentId: {type: String, unique:false},
        price: {type: String},
        vtexCallbackUrl:{type: String},
        urlWindcave: {type: String},
        transactionId: {type: String, unique:false},
        reference:{type: String},
        merchantReference: {type: String},
        username: {type: String},
        apiKey:{type:String},
        tid: {type: String}
    },
    {
      timestamps: true,
    },
  );


const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;