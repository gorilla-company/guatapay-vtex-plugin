import { Logger } from 'conexa-core-server';
import httpStatus from 'http-status';
import { tradesServices, ClientSDK, authService } from 'guatapay-sdk';
import { IMerchantData, IVtexPayment } from '@/interfaces/payment.interface';
import { findUser, createUser } from './database/user.service';
import ApiError from '../lib/ApiError';
import { ITransactionInit } from '@/interfaces/transaction.interface';
import { createTransaction, findTransaction } from './database/transaction.service';
import { Currency } from '@/interfaces/client.interface';
import { handlingToUpdateTransaction, payloadToPaymentApp } from '../lib/provider';

const initPayment = async (vtexPaymentBody: IVtexPayment, merchantData: IMerchantData) => {
  Logger.info('==== GUATAPAY INIT PAYMENT SERVICE ====');
  try {
    const merchant = {
      username: merchantData['Client ID - Guatapay'],
      password: merchantData['Client Secret - Guatapay'],
    };

    let dbUser = await findUser(merchant.username);

    if (!dbUser) {
      Logger.info('User does not have apiKey');
      dbUser = await createUser(merchant.username, merchant.password);
      Logger.info('User apiKey created');
    }

    const transaction: ITransactionInit = {
      username: dbUser.username,
      apiKey: dbUser.apiKey,
      orderId: vtexPaymentBody.orderId,
      vtexTransactionId: vtexPaymentBody.transactionId,
      vtexPaymentId: vtexPaymentBody.paymentId,
      vtexCallbackUrl: vtexPaymentBody.callbackUrl,
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

    const { vtexPaymentId: paymentId, nsu, tid, authorizationId, money } = transaction;
    const payload = payloadToPaymentApp(paymentId, money.fiatAmount, money.fiatCurrency);

    const paymentAppData = {
      appName: 'guatapay.vtex', // TODO: check if this name is correct
      payload,
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
      delayToCancel: 600,
      delayToAutoSettle: 1,
    };

    return response;
  } catch (err) {
    Logger.error('Could not create a new transaction');
    throw new ApiError(httpStatus.BAD_REQUEST, 'Could not create a new transaction', JSON.stringify(err));
  }
};

const getQuotation = async (currency: Currency, amount: string) => {
  Logger.info('==== GUATAPAY GET QUOTATION ====');
  try {
    const data = { currency, amount: Number(amount) };
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

const createIntentPayment = async (currency: Currency, paymentId: string) => {
  Logger.info('==== GUATAPAY CREATE INTENT PAYMENT ====');
  try {
    const dbTransaction = await findTransaction({ vtexPaymentId: paymentId });

    if (!dbTransaction)
      throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found', 'transaction.not-found');

    const dbUser = await findUser(dbTransaction.username);

    if (!dbUser) throw new ApiError(httpStatus.NOT_FOUND, 'User not found', 'user.not-found');

    const { username, password, apiKey } = dbUser;
    const authToken = await authService.authenticate(username, password);
    const guatapay = new ClientSDK(authToken, apiKey, username);

    const paymentIntent = await guatapay.Payment.createPaymentIntent({
      currency,
      amount: Number(dbTransaction.money.fiatAmount),
    });

    const { money, guatapayPaymentId, addressAccount } = await handlingToUpdateTransaction(
      dbTransaction,
      paymentIntent,
    );

    dbTransaction.guatapayPaymentId = guatapayPaymentId;
    dbTransaction.money = money;
    dbTransaction.addressAccount = addressAccount;

    await dbTransaction.save();

    const { cryptoAmount, feesPayedInCrypto, fiatAmount, feesPayedInFiat } = money;
    const { direction: address } = addressAccount;
    const crypto = { amount: cryptoAmount, fee: feesPayedInCrypto };
    const fiat = { amount: fiatAmount, fee: feesPayedInFiat };
    const response = { address, crypto, fiat, paymentId };

    return response;
  } catch (err) {
    Logger.error('Could not create a intent payment');
    throw new ApiError(httpStatus.BAD_REQUEST, 'Could not create a intent payment', JSON.stringify(err));
  }
};

export default {
  initPayment,
  getQuotation,
  createIntentPayment,
};
