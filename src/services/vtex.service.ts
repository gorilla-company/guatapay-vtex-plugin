import axios from 'axios';
import { IncomingHttpHeaders } from 'http';


const twoSecondsDelay = () => {
  return new Promise((resolve, _reject) => {
      setTimeout(resolve, 2000);
  });
};


const delayedCallbackResponse = async (callbackUrl: string, paymentId: string, headers:IncomingHttpHeaders) => {

  await twoSecondsDelay();

  console.log('two seconds');

  const body = {
      paymentId,
      tid: paymentId,
      status: 'approved',
      authorizationId: 'testAuthId',
      nsu: 'testNSU',
  };
  
  const response = await axios.post(callbackUrl, body, {headers: {
    'X-VTEX-API-AppKey':headers['x-vtex-api-appkey'] ?? '',
    'X-VTEX-API-AppToken': headers['x-vtex-api-apptoken'] ?? '',
  }});

  console.log({ response });
  

  return response;
}

const makeVtexPayment = async (callbackUrl: string, paymentId: string, headers: IncomingHttpHeaders) => {

  // const resBody = {
  //     paymentId,
  //     status: 'approved',
  //     callbackUrl,
  //     returnUrl,
  //     paymentUrl: 'https://www.conexa.ai',
  //     tid: 'PaymentIntentionID - 129838723874',
  //     authorizationId: 'authID - 0001',
  //     nsu: `NSU-authUID - 001`,
  // };
  const {API_URL} = process.env;
  console.log(API_URL);
  
  await delayedCallbackResponse(callbackUrl, paymentId, headers);
  //await axios.post(`${API_URL}/api/v1/vtex/payments/delay`, resBody);
}





export {
  twoSecondsDelay,
  delayedCallbackResponse,
  makeVtexPayment
};
