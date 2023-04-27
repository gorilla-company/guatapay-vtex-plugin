import axios from 'axios';
import { IncomingHttpHeaders } from 'http';

const twoSecondsDelay = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
};

const delayedCallbackResponse = async (
  callbackUrl: string,
  paymentId: string,
  headers: IncomingHttpHeaders,
) => {
  await twoSecondsDelay();

  const body = {
    paymentId,
    tid: paymentId,
    status: 'approved',
    authorizationId: 'testAuthId',
    nsu: 'testNSU',
  };

  const response = await axios.post(callbackUrl, body, {
    headers: {
      'X-VTEX-API-AppKey': headers['x-vtex-api-appkey'] ?? '',
      'X-VTEX-API-AppToken': headers['x-vtex-api-apptoken'] ?? '',
    },
  });

  return response;
};

const makeVtexPayment = async (callbackUrl: string, paymentId: string, headers: IncomingHttpHeaders) => {
  await delayedCallbackResponse(callbackUrl, paymentId, headers);
};

export { twoSecondsDelay, delayedCallbackResponse, makeVtexPayment };
