
export interface IVtexPayment{
  reference: string,
  orderId: string,
  shopperInteraction: string,
  transactionId: string,
  paymentId: string,
  paymentMethod: string,
  paymentMethodCustomCode: string,
  merchantName: string,
  card: vtexCard,
  value: number,
  currency: string,
  installments: number,
  deviceFingerprint: string,
  ipAddress: string,
  miniCart: vtexMiniCart,
  merchantSettings: vtexmerchantSettings[],
  url: string,
  callbackUrl: string,
  returnUrl: string
}



interface vtexCard {
    number: string,
    holder: string,
    expiration: {
      month: string,
      year: string
    },
    csc: string,
    document: string
}

interface vtexBuyer {
    id: string,
    firstName: string,
    lastName: string,
    document: number,
    documentType: string,
    corporateName: string,
    tradeName: string,
    corporateDocument: number,
    isCorporate: boolean,
    email: string,
    phone: string,
    createdDate: Date
}

interface vtexShippingAddress {
    country: string,
    street: string,
    number: number,
    complement: string,
    neighborhood: string,
    postalCode: number,
    city: string,
    state: string
}

interface vtexBillingAddress {
    country: string,
    street: string,
    number: number,
    complement: string,
    neighborhood: string,
    postalCode: number,
    city: string,
    state: string
}

interface vtexItem {
    id: string,
    name: string,
    price: number,
    quantity: number,
    discount: number,
    deliveryType: string
}

interface vtexMiniCart {
    buyer: vtexBuyer,
    shippingAddress: vtexShippingAddress,
    billingAddress: vtexBillingAddress,
    items: vtexItem[],
    shippingValue: number,
    taxValue: number
}

interface vtexmerchantSettings{
    name: string,
    type: string
}

export interface vtexBody {
    status: string,
    paymentId: string,
}