import { authService } from 'guatapay-sdk';
import { IPaymentIntentResponse } from 'guatapay-sdk/dist/interfaces/client.interfaces';
import { IMoney, ITransaction, ITransactionInit } from '@/interfaces/transaction.interface';

const generateApiKey = async (username: string, password: string) => {
  const authToken = await authService.authenticate(username, password);
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
    'User-Agent': 'Guatapay VTEX',
  };
  // eslint-disable-next-line @typescript-eslint/return-await
  return await authService.getApiKey(username, { headers });
};

const payloadToPaymentApp = (paymentId: string, total: string, currency: string) => {
  return JSON.stringify({ paymentId, total, currency });
};

const handlingToUpdateTransaction = async (
  initTransaction: ITransaction,
  paymentIntent: IPaymentIntentResponse,
) => {
  const { fiatCurrency, fiatAmount } = initTransaction.money;

  const {
    paymentId: guatapayPaymentId,
    addressAccount: direction,
    addressAccountId: id,
    inputCurrency: cryptoCurrency,
    inputAmount: cryptoAmount,
    feesPayedInCrypto,
    feesPayedInFiat,
    amountPayed,
    fullInputAmount,
  } = paymentIntent;

  const addressAccount = { id, direction };

  const money: IMoney = {
    fiatCurrency,
    fiatAmount,
    cryptoCurrency,
    cryptoAmount,
    feesPayedInCrypto,
    feesPayedInFiat,
    amountPayed,
    fullInputAmount,
  };

  return {
    guatapayPaymentId,
    addressAccount,
    money,
  };
};

const paymentInitResponse = (transaction: ITransactionInit) => {
  const { vtexPaymentId: paymentId, nsu, tid, authorizationId, money, vtexStatus } = transaction;
  const payload = payloadToPaymentApp(paymentId, money.fiatAmount, money.fiatCurrency);

  return {
    paymentId,
    paymentAppData: {
      appName: 'guatapay.vtex',
      payload,
    },
    nsu,
    tid,
    authorizationId,
    status: vtexStatus,
    message: null,
    code: null,
    acquirer: 'Guatapay',
    delayToAutoSettle: 21600,
    delayToAutoSettleAfterAntifraud: 1800,
    delayToCancel: 3600, // 1 hour
  };
};

export { generateApiKey, handlingToUpdateTransaction, payloadToPaymentApp, paymentInitResponse };
