export const vtexManifest = {
  customFields: [
    { name: 'Client ID - Guatapay', type: 'text' },
    { name: 'Client Secret - Guatapay', type: 'text' },
  ],
  paymentMethods: [{ allowsSplit: 'disabled', name: 'Guatapay' }],
};

export const cancelPaymentManual = {
  paymentId: 'eef1df2b-3af4-4dcf-baba-d87s020b46a14',
  message: 'Cancellation should be done manually',
  code: 'cancel-manually',
  cancellationId: null,
  requestId: '007B7D9B3BB4440982D8B6BA04126B01',
};

export const refundPaymentNotImp = {
  paymentId: 'F5C1A4E20D3B4E07B7E871F5B5BC9F91',
  refundId: null,
  value: 0,
  code: 'refund-manually',
  message: 'This payment needs to be manually refunded',
  requestId: 'LA4E20D3B4E07B7E871F5B5BC9F91',
};

export const settleResponse = {
  paymentId: 'F5C1A4E20D3B4E07B7E871F5B5BC9F91',
  settleId: '2EA354989E7E4BBC9F9D7B66674C2574',
  value: 57,
  code: null,
  message: 'Successfully settled',
  requestId: 'DCEAA1FC8372E430E8236649DB5EBD08E',
};

export const invalidPayment = {
  reference: 'ddb004bas-4394-4940-9857s-c22b7a5f60f1',
  orderId: '1655sd30s4389',
  shopperInteraction: 'Ecommerce',
  transactionId: '759d128f-a9ddbs8-45c6-8a40-45dffe991c5c',
  paymentId: 'eef1df2b-3af4-4dcf-baba-d87s020b46a14',
  paymentMethod: 'Visa',
  paymentMethodCustomCode: null,
  merchantName: 'Guatapay',
  card: {
    number: null,
    holder: null,
    expiration: {
      month: null,
      year: null,
    },
    csc: null,
    document: null,
  },
  value: 1000000,
  currency: 'COP',
  installments: 1,
  deviceFingerprint: '12ade389087fe',
  ipAddress: null,
  miniCart: {
    buyer: {
      id: 'c1245228-1c68-11e6-94ac-0afa86a846a5',
      firstName: 'John',
      lastName: 'Doe',
      document: '01234567890',
      documentType: 'CPF',
      corporateName: null,
      tradeName: null,
      corporateDocument: null,
      isCorporate: false,
      email: 'john.doe@example.com',
      phone: '+5521987654321',
      createdDate: null,
    },
    shippingAddress: {
      country: 'BRA',
      street: 'Praia de Botafogo St.',
      number: '300',
      complement: '3rd Floor',
      neighborhood: 'Botafogo',
      postalCode: '22250040',
      city: 'Rio de Janeiro',
      state: 'RJ',
    },
    billingAddress: {
      country: 'BRA',
      street: 'Brig. Faria Lima Avenue',
      number: '4440',
      complement: '10th Floor',
      neighborhood: 'Itaim Bibi',
      postalCode: '04538132',
      city: 'São Paulo',
      state: 'SP',
    },
    items: [
      {
        id: '132981',
        name: 'My First Product',
        price: 50.25,
        quantity: 2,
        discount: 0,
        deliveryType: null,
      },
      {
        id: '132982',
        name: 'My Second Product',
        price: 50.25,
        quantity: 1,
        discount: 1,
        deliveryType: null,
      },
    ],
    shippingValue: 10.12,
    taxValue: 0.02,
  },
  merchantSettings: [
    {
      name: 'Invalid-User',
      value: 'invalid-user',
    },
    {
      name: 'Invalid-Key',
      value: 'invalid',
    },
  ],
  url: 'https://admin.mystore.example.com/orders/v32478982',
  callbackUrl:
    'https://heimdall.vtexpayments.com.br/api/payment-provider/callback/900a0051-b88f-4232-9c60-00eda066fc9d/wompi/eef1df2b-3af4-40cf-baba-d87020b46a44',
  returnUrl: 'https://mystore.example.com/checkout/order/v32478982',
};

export const validPayment = {
  reference: 'ddb004bas-4394-4940-9857s-c22b7a5f60f5',
  orderId: '1655sd30s4389',
  shopperInteraction: 'Ecommerce',
  transactionId: '759d128f-a9ddbs8-45c6-8a40-45dffe991c5c',
  paymentId: 'eef1df2b-3af4-4dcf-baba-d87s020b46a14',
  paymentMethod: 'Visa',
  paymentMethodCustomCode: null,
  merchantName: 'Guatapay',
  card: {
    number: null,
    holder: null,
    expiration: {
      month: null,
      year: null,
    },
    csc: null,
    document: null,
  },
  value: 100000,
  currency: 'COP',
  installments: 1,
  deviceFingerprint: '12ade389087fe',
  ipAddress: null,
  miniCart: {
    buyer: {
      id: 'c1245228-1c68-11e6-94ac-0afa86a846a5',
      firstName: 'John',
      lastName: 'Doe',
      document: '01234567890',
      documentType: 'CPF',
      corporateName: null,
      tradeName: null,
      corporateDocument: null,
      isCorporate: false,
      email: 'john.doe@example.com',
      phone: '+5521987654321',
      createdDate: null,
    },
    shippingAddress: {
      country: 'BRA',
      street: 'Praia de Botafogo St.',
      number: '300',
      complement: '3rd Floor',
      neighborhood: 'Botafogo',
      postalCode: '22250040',
      city: 'Rio de Janeiro',
      state: 'RJ',
    },
    billingAddress: {
      country: 'BRA',
      street: 'Brig. Faria Lima Avenue',
      number: '4440',
      complement: '10th Floor',
      neighborhood: 'Itaim Bibi',
      postalCode: '04538132',
      city: 'São Paulo',
      state: 'SP',
    },
    items: [
      {
        id: '132981',
        name: 'My First Product',
        price: 50.25,
        quantity: 2,
        discount: 0,
        deliveryType: null,
      },
      {
        id: '132982',
        name: 'My Second Product',
        price: 50.25,
        quantity: 1,
        discount: 1,
        deliveryType: null,
      },
    ],
    shippingValue: 10.12,
    taxValue: 0.02,
  },
  merchantSettings: [
    {
      name: 'Client ID - Guatapay',
      value: 'andres@conexa.ai',
    },
    {
      name: 'Client Secret - Guatapay',
      value: '12345678',
    },
  ],
  url: 'https://admin.mystore.example.com/orders/v32478982',
  callbackUrl:
    'https://heimdall.vtexpayments.com.br/api/payment-provider/callback/896b9217-9310-4407-81d6-d6f15ccb9267/conexapartnermx/efec47f3-f784-4eaf-b6f0-d984d9ab16a1',
  returnUrl: 'https://mystore.example.com/checkout/order/v32478982',
};
