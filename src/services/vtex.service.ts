import axios from 'axios';
import { IncomingHttpHeaders } from 'http';

/**
 * Creates a delay of two seconds.
 */
const twoSecondsDelay = () => {
  return new Promise((resolve, _reject) => {
      setTimeout(resolve, 2000);
  });
};

/**
 * Creates a request to callback url to simulate a payment
 * 
 */
const delayedCallbackResponse = async (callbackUrl: string, paymentId: string, reqHeaders: IncomingHttpHeaders) => {

  await twoSecondsDelay();
  const body = {
      paymentId,
      tid: paymentId,
      status: 'approved',
      authorizationId: 'testAuthId',
      nsu: 'testNSU',
  };

  const response = await axios.post(callbackUrl, body, {headers: {
    'X-VTEX-API-AppKey': reqHeaders['x-vtex-api-appkey'],
    'X-VTEX-API-AppToken': reqHeaders['x-vtex-api-apptoken'],
  }});

  return response;
}



export {
  delayedCallbackResponse,
};
