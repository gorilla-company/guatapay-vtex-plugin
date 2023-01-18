
export interface ISession {
    type: string,
    merchantReference:string,
    amount:string,
    currency:string,
    storeCard:boolean,
    storedCardIndicator:string,
    recurringExpiry:string,
    //recurringFrequency:string,
    callbackUrls:ICallbackUrl,
    notificationUrl:string
}

interface ICallbackUrl {
    approved:string,
    declined:string,
    cancelled:string
}


export interface ITransactionResponse {
    id:string,
    state:string,
    links:WincaveLinks[],
}

interface WincaveLinks {
    href: string,
    rel: string,
    method:string
}

export interface ITransactionError{
    requestId: string,
    timestampUtc: Date,
    errors: IErrorType[]
}

interface IErrorType{
    target: string,
    message: string
}

export interface ITransactions{
    "id":string,
    "username":string,
    "authorised":boolean,
    "allowRetry":boolean,
    "retryIndicator":string,
    "reCo":string,
    "responseText":string,
    "authCode":string,
    "acquirer":{
       "name":string,
       "mid":string,
       "tid":string
    },
    "type":string,
    "method":string,
    "localTimeZone":string,
    "dateTimeUtc":Date,
    "dateTimeLocal":Date,
    "settlementDate":string,
    "amount":string,
    "balanceAmount":string,
    "currency":string,
    "currencyNumeric":number,
    "clientType":string,
    "merchantReference":string,
    "card":{
       "id":string,
       "cardHolderName":string,
       "cardNumber":string,
       "dateExpiryMonth":string,
       "dateExpiryYear":string,
       "type":string
    },
    "cvc2ResultCode":string,
    "storedCardIndicator":string,
    "notificationUrl":string,
    "cardAccountSelected":string,
    "avs":{
       "postCode":string,
       "streetAddress":string,
       "avsAction":number,
       "avsActionName":string,
       "avsResultCode":string,
       "avsResultDescription":string
    },
    "sessionId":string,
    "browser":{
       "ipAddress":string,
       "userAgent":string
    },
    "isSurcharge":boolean,
    "risk":{
       "action":string,
       "score":number,
       "possible":number,
       "summaryText":string
    },
    "threeds":{
       "status":string,
       "acsTransId":string
    },
    "liabilityIndicator":string,
    "links":WincaveLinks[]
 }

export interface ISessionCallback {
    transactions: ITransactions[]
}

/**
 * {
   "id":"00000300007016080393359387315951",
   "state":"complete",
   "type":"purchase",
   "amount":"159.89",
   "currency":"USD",
   "currencyNumeric":840,
   "merchantReference":"1655sd30s4397",
   "methods":[
      "card"
   ],
   "expires":"2023-01-05T20:15:52Z",
   "storedCardIndicator":"recurringinitial",
   "recurringExpiry":"9999-12-31",
   "callbackUrls":{
      "approved":"https://heimdall.vtexpayments.com.br/api/payment-provider/callback/900a0051-b88f-4232-9c60-00eda066fc9d/wompi/eef1df2b-3af4-40cf-baba-d87020b46a44",
      "declined":"https://heimdall.vtexpayments.com.br/api/payment-provider/callback/900a0051-b88f-4232-9c60-00eda066fc9d/wompi/eef1df2b-3af4-40cf-baba-d87020b46a44",
      "cancelled":"https://heimdall.vtexpayments.com.br/api/payment-provider/callback/900a0051-b88f-4232-9c60-00eda066fc9d/wompi/eef1df2b-3af4-40cf-baba-d87020b46a44"
   },
   "notificationUrl":"https://a150-200-107-98-8.sa.ngrok.io/api/v1/ipn/event",
   "storeCard":true,
   "clientType":"internet",
   "links":[
      {
         "href":"https://uat.windcave.com/api/v1/sessions/00000300007016080393359387315951",
         "rel":"self",
         "method":"GET"
      },
      {
         "href":"https://uat.windcave.com/api/v1/transactions/0000000300dea880",
         "rel":"transaction",
         "method":"GET"
      }
   ],
   "transactions":[
      {
         "id":"0000000300dea880",
         "username":"Vtex_RESTDev",
         "authorised":true,
         "allowRetry":false,
         "retryIndicator":"",
         "reCo":"00",
         "responseText":"APPROVED",
         "authCode":"091723",
         "acquirer":{
            "name":"Unspecified",
            "mid":"12345678",
            "tid":"12345678"
         },
         "type":"purchase",
         "method":"card",
         "localTimeZone":"",
         "dateTimeUtc":"2023-01-02T20:17:04Z",
         "dateTimeLocal":"2023-01-02T20:17:04-00:00",
         "settlementDate":"2023-01-03",
         "amount":"159.89",
         "balanceAmount":"0.00",
         "currency":"USD",
         "currencyNumeric":840,
         "clientType":"internet",
         "merchantReference":"1655sd30s4397",
         "card":{
            "id":"0000030001023105",
            "cardHolderName":"CARLOS",
            "cardNumber":"558888......7770",
            "dateExpiryMonth":"03",
            "dateExpiryYear":"23",
            "type":"mastercard"
         },
         "cvc2ResultCode":"U",
         "storedCardIndicator":"recurringinitial",
         "notificationUrl":"https://a150-200-107-98-8.sa.ngrok.io/api/v1/ipn/event",
         "cardAccountSelected":"credit",
         "avs":{
            "postCode":"",
            "streetAddress":"",
            "avsAction":0,
            "avsActionName":"DontCheck",
            "avsResultCode":"U",
            "avsResultDescription":"U - address information not available, or AVS is unavailable"
         },
         "sessionId":"00000300007016080393359387315951",
         "browser":{
            "ipAddress":"200.107.98.8",
            "userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
         },
         "isSurcharge":false,
         "risk":{
            "action":"noaction",
            "score":10,
            "possible":10,
            "summaryText":"[ Country CCC:TW vs IPC:AR Triggered (10/10) ]"
         },
         "threeds":{
            "status":"Y",
            "acsTransId":"e248fb20-42cc-11b2-a000-030000dea880"
         },
         "liabilityIndicator":"3ds2challenge",
         "links":[
            {
               "href":"https://uat.windcave.com/api/v1/transactions/0000000300dea880",
               "rel":"self",
               "method":"GET"
            },
            {
               "href":"https://uat.windcave.com/api/v1/sessions/00000300007016080393359387315951",
               "rel":"session",
               "method":"GET"
            },
            {
               "href":"https://uat.windcave.com/api/v1/transactions",
               "rel":"refund",
               "method":"POST"
            }
         ]
      }
   ]
}
 */