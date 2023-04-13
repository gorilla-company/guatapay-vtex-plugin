import { authService } from 'guatapay-sdk';
import { IPaymentIntentResponse } from 'guatapay-sdk/dist/interfaces/client.interfaces';
import { IMoney, ITransaction } from '@/interfaces/transaction.interface';

const generateApiKey = async (username: string, password: string) => {
  const authToken = await authService.authenticate(username, password);
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
    'User-Agent': 'Guatapay VTEX',
  };
  const apiKey = await authService.getApiKey(username, { headers });
  return apiKey;
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

  const dataHandled = {
    guatapayPaymentId,
    addressAccount,
    money,
  };

  return dataHandled;
};

export { generateApiKey, handlingToUpdateTransaction, payloadToPaymentApp };
