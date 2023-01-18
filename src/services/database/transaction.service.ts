import { Logger } from 'conexa-core-server';
import Transaction from "../../models/Transaction.model"

import { ITransaction } from '../../interfaces/transaction.interface';


export const getTransactionsCount = () => {
    try {
        const transactionsCount = Transaction.countDocuments({})
        return transactionsCount
    } catch (error) {
        Logger.error(error)
        throw error
    }
}

export const createTransaction = async (data: ITransaction) => await new Transaction(data).save();

export const findTransaction = async (condition: any) => await Transaction.findOne(condition);


