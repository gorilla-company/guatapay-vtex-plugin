import { Currency } from 'guatapay-sdk/dist/interfaces/client.interfaces';
import Joi from 'joi';

const { btc, lightningBtc, usdc }: { [key: string]: Currency } = {
  btc: 'btc',
  lightningBtc: 'lightning-btc',
  usdc: 'usdc',
};

const intentPayment = {
  body: Joi.object().keys({
    currency: Joi.string().valid(btc, lightningBtc, usdc).required(),
    paymentId: Joi.string().required(),
  }),
};

export default { intentPayment };
