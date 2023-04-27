import { Logger } from 'conexa-core-server';
import httpStatus from 'http-status';
import { tradesServices, ClientSDK, authService } from 'guatapay-sdk';
import vtexPackage from 'vtex-package-ts';
import { ICancellationPayload, IVtexNotifyPaymentPayload } from 'vtex-package-ts/dist/interfaces';
import { Currency, Status } from 'guatapay-sdk/dist/interfaces/client.interfaces';
import { IMerchantData, IVtexPayment } from '@/interfaces/payment.interface';
import { findUser, createUser } from './database/user.service';
import ApiError from '../lib/ApiError';
import { ITransactionInit } from '../interfaces/transaction.interface';
import { createTransaction, findTransaction } from './database/transaction.service';
import config from '../config/config';
import { handlingToUpdateTransaction, initPaymentResponse } from '../lib/provider';

const { payments: vtex } = vtexPackage;

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
      vtexStatus: 'undefined',
      guatapayStatus: 'init',
      nsu: `NSU-${vtexPaymentBody.paymentId}`,
      tid: `TID-${vtexPaymentBody.transactionId}`,
      authorizationId: `AUT-${vtexPaymentBody.reference}`,
      money: {
        fiatAmount: vtexPaymentBody.value.toFixed(2),
        fiatCurrency: vtexPaymentBody.currency,
      },
    };

    await createTransaction(transaction);

    return initPaymentResponse(transaction);
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

    return { crypto, fiat };
  } catch (err) {
    Logger.error('Could not create a new quotation');
    throw new ApiError(httpStatus.BAD_REQUEST, 'Could not create a new quotation', JSON.stringify(err));
  }
};

const createIntentPayment = async (currency: Currency, vtexPaymentId: string) => {
  Logger.info('==== GUATAPAY CREATE INTENT PAYMENT ====');
  try {
    const dbTransaction = await findTransaction({ vtexPaymentId });

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
    dbTransaction.guatapayStatus = 'pending';
    await dbTransaction.save();

    const { cryptoAmount, feesPayedInCrypto, fiatAmount, feesPayedInFiat } = money;
    const { direction: qrString } = addressAccount;
    const crypto = { amount: cryptoAmount, fee: feesPayedInCrypto };
    const fiat = { amount: fiatAmount, fee: feesPayedInFiat };

    return { qrString, crypto, fiat, paymentId: vtexPaymentId };
  } catch (err) {
    Logger.error('Could not create a intent payment');
    throw new ApiError(httpStatus.BAD_REQUEST, 'Could not create a intent payment', JSON.stringify(err));
  }
};

const updatePayment = async (vtexPaymentId: string) => {
  Logger.info('==== GUATAPAY GET PAYMENT STATUS ====');

  const dbTransaction = await findTransaction({ vtexPaymentId });

  if (!dbTransaction)
    throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found', 'transaction.not-found');

  try {
    const payment = await tradesServices.getPaymentStatus(dbTransaction.guatapayPaymentId);

    if (payment.status === 'pending')
      return Logger.info(`Intent payment with vtexId ${vtexPaymentId} is still pending`);

    dbTransaction.guatapayStatus = payment.status;
    dbTransaction.money.amountPayed = payment.amountPayed;
    dbTransaction.vtexStatus = 'approved';
    await dbTransaction.save();

    const vtexAuth = vtex.getAuthObject(config.vtexKey, config.vtexToken, config.vtexApi);

    const vtexBody: IVtexNotifyPaymentPayload = {
      paymentId: dbTransaction.vtexPaymentId,
      status: dbTransaction.vtexStatus,
    };

    Logger.info(`Intent payment with vtexId ${vtexPaymentId} was ${payment.status}`);
    return await vtex.notifyPaymentStatus(vtexAuth, dbTransaction.vtexCallbackUrl, vtexBody);
  } catch (err: any) {
    const expired: Status = 'expired';

    if (err.message.includes(expired)) {
      Logger.error(`Intent payment with vtexId ${vtexPaymentId} is expired`);
      dbTransaction.guatapayStatus = expired;
      return await dbTransaction.save();
    }

    Logger.error('Could not update a intent payment');
    throw new ApiError(httpStatus.BAD_REQUEST, 'Could not create a intent payment', JSON.stringify(err));
  }
};

const createCancellation = async (vtexBody: ICancellationPayload) => {
  Logger.info('==== GUATAPAY CREATE CANCELLATION ====');

  try {
    const { paymentId: vtexPaymentId } = vtexBody;
    const dbTransaction = await findTransaction({ vtexPaymentId });

    if (!dbTransaction)
      throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found', 'transaction.not-found');

    dbTransaction.guatapayStatus = 'expired';
    dbTransaction.vtexStatus = 'denied';

    Logger.error('==== CANCELLATION MUST BE DONE MANUALLY ====');
    return vtex.cancellationPaymentResponse(vtexBody);
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Could not process cancellation', JSON.stringify(err));
  }
};

export default {
  initPayment,
  getQuotation,
  createIntentPayment,
  updatePayment,
  createCancellation,
};
