import axios from 'axios';
import { Logger } from 'conexa-core-server';
import { RequestHandler } from 'express-serve-static-core';

const SOME_ID = '972e-b67ad7b498ba';
const manifestToVtex = await import('../config/manifest.json', { assert: { type: 'json' } });
const paymentMethodToVtex = await import('../config/paymentMethods.json', { assert: { type: 'json' } });

const manifest: RequestHandler = async (_, res) => {
  Logger.info('===== MANIFEST =====');
  res.json(manifestToVtex);
};

const paymentMethods: RequestHandler = async (_, res) => {
  Logger.info('===== PAYMENT METHODS =====');
  res.json(paymentMethodToVtex);
};

const buildPaymentResponseBody = (req: any, status: string) => {
  const { body } = req;

  const payload: any = {
    paymentId: body.paymentId,
    status,
    callbackUrl: body.callbackUrl,
    returnUrl: body.returnUrl,
    paymentUrl: 'https://mypaymenturl.com',
    tid: body.paymentId,
  };

  if (status !== 'undefined') {
    payload.authorizationId = SOME_ID;
    payload.nsu = SOME_ID;
    payload.settleId = SOME_ID;
  }

  return payload;
};

const sendSyncResponse = (req: Request, res: any, status: string) => {
  const payload = buildPaymentResponseBody(req, status);
  res.json(payload);
};

const getAuthHeadersFromIncomingRequest = () => {
  // 'X-VTEX-API-AppKey': req.headers['x-vtex-api-appkey'],
  // 'X-VTEX-API-AppToken': req.headers['x-vtex-api-apptoken'],

  return {
    'X-VTEX-API-AppKey': 'vtexappkey-modopartnerar-YUGGCU',
    'X-VTEX-API-AppToken':
      'RNHADJQBXLQEVEPOZVYFMOROAQYUSNVLDLMLVBAKIWDMEDQLHNRCPGKVHQZBUADOVXOGDXFUJRANEDBBQKTHACQOVQJYLOFRXYBTIJABZGPEOKSYLDITZZQXODAEEQTM',
  };
};

const sendSyncAndAsyncResponses = (req: any, res: Response, status = 'approved') => {
  // Send standard response for async methods
  sendSyncResponse(req, res, 'undefined');

  // Sends the async response after a little while
  setTimeout(() => {
    const payload = buildPaymentResponseBody(req, status);
    const headers = getAuthHeadersFromIncomingRequest();

    axios.post(req.body.callbackUrl, payload, { headers });
  }, 1000);
};

const getStatusFromCardEnding = (cardNumber: string) => {
  const cardNumberEnding = cardNumber.slice(15);

  const paymentStatusSyncMap: any = {
    '1': 'approved',
    '2': 'denied',
    '4': 'undefined',
    '5': 'undefined',
  };
  const paymentStatusAsyncMap: any = {
    '4': 'approved',
    '5': 'denied',
  };

  const statusSync = paymentStatusSyncMap[cardNumberEnding];
  const statusAsync = paymentStatusAsyncMap[cardNumberEnding];

  return { statusSync, statusAsync };
};

const payments = async (req: any, res: any) => {
  try {
    Logger.info('\n===== CREATE PAYMENT =====');
    const cardNumber = req.body.card?.number;
    const { paymentMethod } = req.body;

    Logger.info('Payment Method:', paymentMethod);

    if (cardNumber) {
      const { statusSync, statusAsync } = getStatusFromCardEnding(cardNumber);
      Logger.info({ statusSync, statusAsync });

      // if we respond 'undefined', we need to send an async response to tell how the transaction ended
      if (statusSync === 'undefined') return sendSyncAndAsyncResponses(req, res, statusAsync);
      return sendSyncResponse(req, res, statusSync);
    }
    Logger.info('Sync method');
    // It is a redirect method
    return sendSyncAndAsyncResponses(req, res, 'approved');
  } catch (error) {
    Logger.info(error);
    res.send('error');
  }
};

const cancellations = async (req: any, res: any) => {
  Logger.info('===== CANCEL PAYMENT =====');
  const { requestId, paymentId } = req.body;

  const payload = {
    paymentId,
    message: 'Cancellation should be done manually',
    requestId,
    code: 'cancel-manually',
    cancellationId: null,
  };
  res.status(501).json(payload);
};

const refunds = async (req: any, res: any) => {
  Logger.info('===== REFUND PAYMENT =====');
  const { requestId, paymentId } = req.body;

  const payload = {
    paymentId,
    refundId: null,
    value: 0,
    code: 'refund-manually',
    requestId,
    message: 'This payment needs to be manually refunded',
  };
  res.status(501).json(payload);
};

const settlements = async (req: any, res: any) => {
  Logger.info('===== SETTLE PAYMENT =====');
  const { requestId, paymentId, value } = req.body;

  const payload = {
    paymentId,
    value,
    requestId,
    message: 'transaction settled',
    code: paymentId,
    settleId: paymentId,
  };
  res.status(200).json(payload);
};

export default { payments, manifest, cancellations, refunds, settlements, paymentMethods };
