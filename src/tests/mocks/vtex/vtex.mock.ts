
export const vtexManifest = {
    "customFields": [
        {"name": "name", "type": "text"}, 
        {"name": "API key", "type": "text"}, 
    ], 
    "paymentMethods": [
        {"allowsSplit": "disabled", "name": "name"}
    ]
}

export const vtexPaymentMethods = {
    "paymentMethods": [
        "name"
    ]

}

export const cancelPaymentManual = {
    "paymentId": "B2F246B3CE46469FBDD23039868E95D0",
    "message": "Cancellation should be done manually",
    "code": "cancel-manually",
    "cancellationId": null,
    "requestId": "007B7D9B3BB4440982D8B6BA04126B01"
}

export const refundPaymentNotImp = {
    "paymentId": "F5C1A4E20D3B4E07B7E871F5B5BC9F91",
    "refundId": null,
    "value": 0,
    "code": "refund-manually",
    "message": "This payment needs to be manually refunded",
    "requestId": "LA4E20D3B4E07B7E871F5B5BC9F91"
}

export const settleResponse = {
    "paymentId": "F5C1A4E20D3B4E07B7E871F5B5BC9F91",
    "settleId": "2EA354989E7E4BBC9F9D7B66674C2574",
    "value": 57,
    "code": null,
    "message": "Successfully settled",
    "requestId": "DCEAA1FC8372E430E8236649DB5EBD08E"
}

export const invalidPayment ={
    "reference": "ddb004bas-4394-4940-9857s-c22b7a5f60f1",
    "orderId": "1655sd30s4389",
    "shopperInteraction": "Ecommerce",
    "transactionId": "759d128f-a9ddbs8-45c6-8a40-45dffe991c5c",
    "paymentId": "eef1df2b-3af4-4dcf-baba-d87s020b46a14",
    "paymentMethod": "Visa",
    "paymentMethodCustomCode": null,
    "merchantName": "Windcave",
    "card": {
      "number": null,
      "holder": null,
      "expiration": {
        "month": null,
        "year": null
      },
      "csc": null,
      "document": null
    },
    "value": 159.89,
    "currency": "USD",
    "installments": 1,
    "deviceFingerprint": "12ade389087fe",
    "ipAddress": null,
    "miniCart": {
      "buyer": {
        "id": "c1245228-1c68-11e6-94ac-0afa86a846a5",
        "firstName": "John",
        "lastName": "Doe",
        "document": "01234567890",
        "documentType": "CPF",
        "corporateName": null,
        "tradeName": null,
        "corporateDocument": null,
        "isCorporate": false,
        "email": "john.doe@example.com",
        "phone": "+5521987654321",
        "createdDate": null
      },
      "shippingAddress": {
        "country": "BRA",
        "street": "Praia de Botafogo St.",
        "number": "300",
        "complement": "3rd Floor",
        "neighborhood": "Botafogo",
        "postalCode": "22250040",
        "city": "Rio de Janeiro",
        "state": "RJ"
      },
      "billingAddress": {
        "country": "BRA",
        "street": "Brig. Faria Lima Avenue",
        "number": "4440",
        "complement": "10th Floor",
        "neighborhood": "Itaim Bibi",
        "postalCode": "04538132",
        "city": "São Paulo",
        "state": "SP"
      },
      "items": [
        {
          "id": "132981",
          "name": "My First Product",
          "price": 50.25,
          "quantity": 2,
          "discount": 0,
          "deliveryType": null
        },
        {
          "id": "132982",
          "name": "My Second Product",
          "price": 50.25,
          "quantity": 1,
          "discount": 1,
          "deliveryType": null
        }
      ],
      "shippingValue": 10.12,
      "taxValue": 0.02
    },
    "merchantSettings": [
      {
          "name": "Invalid-User",
          "value":"invalid-user"
      },
      {
          "name": "Invalid-Key",
          "value": "invalid"
      }],
    "url": "https://admin.mystore.example.com/orders/v32478982",
    "callbackUrl": "https://heimdall.vtexpayments.com.br/api/payment-provider/callback/900a0051-b88f-4232-9c60-00eda066fc9d/wompi/eef1df2b-3af4-40cf-baba-d87020b46a44",
    "returnUrl": "https://mystore.example.com/checkout/order/v32478982"
}

export const validPayment ={
  "reference": "ddb004bas-4394-4940-9857s-c22b7a5f60f1",
  "orderId": "1655sd30s4389",
  "shopperInteraction": "Ecommerce",
  "transactionId": "759d128f-a9ddbs8-45c6-8a40-45dffe991c5c",
  "paymentId": "eef1df2b-3af4-4dcf-baba-d87s020b46a14",
  "paymentMethod": "Visa",
  "paymentMethodCustomCode": null,
  "merchantName": "Windcave",
  "card": {
    "number": null,
    "holder": null,
    "expiration": {
      "month": null,
      "year": null
    },
    "csc": null,
    "document": null
  },
  "value": 159.89,
  "currency": "USD",
  "installments": 1,
  "deviceFingerprint": "12ade389087fe",
  "ipAddress": null,
  "miniCart": {
    "buyer": {
      "id": "c1245228-1c68-11e6-94ac-0afa86a846a5",
      "firstName": "John",
      "lastName": "Doe",
      "document": "01234567890",
      "documentType": "CPF",
      "corporateName": null,
      "tradeName": null,
      "corporateDocument": null,
      "isCorporate": false,
      "email": "john.doe@example.com",
      "phone": "+5521987654321",
      "createdDate": null
    },
    "shippingAddress": {
      "country": "BRA",
      "street": "Praia de Botafogo St.",
      "number": "300",
      "complement": "3rd Floor",
      "neighborhood": "Botafogo",
      "postalCode": "22250040",
      "city": "Rio de Janeiro",
      "state": "RJ"
    },
    "billingAddress": {
      "country": "BRA",
      "street": "Brig. Faria Lima Avenue",
      "number": "4440",
      "complement": "10th Floor",
      "neighborhood": "Itaim Bibi",
      "postalCode": "04538132",
      "city": "São Paulo",
      "state": "SP"
    },
    "items": [
      {
        "id": "132981",
        "name": "My First Product",
        "price": 50.25,
        "quantity": 2,
        "discount": 0,
        "deliveryType": null
      },
      {
        "id": "132982",
        "name": "My Second Product",
        "price": 50.25,
        "quantity": 1,
        "discount": 1,
        "deliveryType": null
      }
    ],
    "shippingValue": 10.12,
    "taxValue": 0.02
  },
  "merchantSettings": [
    {
      "name": "Username - Windcave",
      "value":"Vtex_RESTDev"
    },
    {
      "name": "API key production - Windcave",
      "value": "c5641139355eadc3c7d3278a4803aee7fc7f7e66ae8ecf4ad209b0e497797d2b"
    }],
  "url": "https://admin.mystore.example.com/orders/v32478982",
  "callbackUrl": "https://heimdall.vtexpayments.com.br/api/payment-provider/callback/900a0051-b88f-4232-9c60-00eda066fc9d/wompi/eef1df2b-3af4-40cf-baba-d87020b46a44",
  "returnUrl": "https://mystore.example.com/checkout/order/v32478982"
}