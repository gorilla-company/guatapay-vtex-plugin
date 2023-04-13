import { Logger } from 'conexa-core-server';
import httpStatus from 'http-status';
import { tradesServices } from 'guatapay-sdk';
import { IMerchantData, IVtexPayment } from '@/interfaces/payment.interface';
import { findOrCreateUser } from './database/user.service';
import ApiError from '../lib/ApiError';
import { ITransactionInit } from '@/interfaces/transaction.interface';
import { createTransaction, findTransaction } from './database/transaction.service';
import { Currency } from '@/interfaces/client.interface';

const initPayment = async (vtexPaymentBody: IVtexPayment, merchantData: IMerchantData) => {
  Logger.info('==== GUATAPAY INIT PAYMENT SERVICE ====');
  try {
    const dbUser = await findOrCreateUser({
      username: merchantData['Client ID - Guatapay'],
      password: merchantData['Client Secret - Guatapay'],
    });

    if (!dbUser) throw new ApiError(httpStatus.NOT_FOUND, 'User not found', 'user.not-found');

    const transaction: ITransactionInit = {
      username: dbUser.username,
      apiKey: dbUser.apiKey,
      orderId: vtexPaymentBody.orderId,
      vtexTransactionId: vtexPaymentBody.transactionId,
      vtexPaymentId: vtexPaymentBody.paymentId,
      reference: vtexPaymentBody.reference,
      status: 'init',
      nsu: `NSU-${vtexPaymentBody.paymentId}`,
      tid: `TID-${vtexPaymentBody.transactionId}`,
      authorizationId: `AUT-${vtexPaymentBody.reference}`,
      money: {
        fiatAmount: vtexPaymentBody.value.toFixed(2),
        fiatCurrency: vtexPaymentBody.currency,
      },
    };

    await createTransaction(transaction);

    const { orderId, money, vtexPaymentId: paymentId, nsu, tid, authorizationId } = transaction;

    const paymentAppData = {
      // TODO: check if this name is correct
      appName: 'guatapay.vtex',
      payload: JSON.stringify({ orderId, money }),
    };

    const response = {
      paymentId,
      paymentAppData,
      nsu,
      tid,
      authorizationId,
      status: 'undefined',
      message: null,
      code: null,
      delayToAutoSettleAfterAntifraud: 0,
      delayToCancel: 3600,
      delayToAutoSettle: 1,
    };

    return response;
  } catch (err) {
    Logger.error('Could not create a new transaction');
    throw new ApiError(httpStatus.BAD_REQUEST, 'Could not create a new transaction', JSON.stringify(err));
  }
};

const getQuotation = async (currency: Currency, orderId: string) => {
  try {
    const dbTransaction = await findTransaction({ orderId });

    if (!dbTransaction)
      throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found', 'transaction.not-found');

    const data = { currency, amount: Number(dbTransaction.money.fiatAmount) };

    const { crypto: cryptoQuote, fiat: fiatQuote, buyerFees } = await tradesServices.getMarketQuote(data);

    const crypto = {
      amount: cryptoQuote.amount,
      fee: buyerFees[0].expressedInCrypto,
    };

    const fiat = {
      amount: fiatQuote.amount,
      fee: buyerFees[1].expressedInFiat,
    };

    const response = { crypto, fiat };

    return response;
  } catch (err) {
    Logger.error('Could not create a new quotation');
    throw new ApiError(httpStatus.BAD_REQUEST, 'Could not create a new quotation', JSON.stringify(err));
  }
};

export default {
  initPayment,
  getQuotation,
};
