

export interface ITransaction{
    status: string,
    orderId: string,
    vtexPaymentId: string,
    price: string,
    vtexCallbackUrl:string,
    userId:string,
    urlWindcave: string,
    transactionId: string,
    reference:string,
    merchantReference: string,
    tid: string,
    apiKey: string,
    username:string
}

export interface IPaymentResponse {
    paymentId: string,
    status: string,
    callbackUrl: string,
    returnUrl: string,
    paymentUrl: string,
    tid: string,
    delayToCancel: number // 15 min delay for cancellation.
  }