export interface IVtexPayment {
  reference: string;
  orderId: string;
  shopperInteraction: string;
  transactionId: string;
  paymentId: string;
  paymentMethod: string;
  paymentMethodCustomCode: string;
  merchantName: string;
  card: IVtexCard;
  value: number;
  currency: string;
  installments: number;
  deviceFingerprint: string;
  ipAddress: string;
  miniCart: IVtexMiniCart;
  merchantSettings: IVtexMerchantSettings[];
  url: string;
  callbackUrl: string;
  returnUrl: string;
}

interface IVtexCard {
  number: string;
  holder: string;
  expiration: {
    month: string;
    year: string;
  };
  csc: string;
  document: string;
}

interface IVtexBuyer {
  id: string;
  firstName: string;
  lastName: string;
  document: number;
  documentType: string;
  corporateName: string;
  tradeName: string;
  corporateDocument: number;
  isCorporate: boolean;
  email: string;
  phone: string;
  createdDate: Date;
}

interface IVtexShippingAddress {
  country: string;
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  postalCode: number;
  city: string;
  state: string;
}

interface IVtexBillingAddress {
  country: string;
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  postalCode: number;
  city: string;
  state: string;
}

interface IVtexItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  discount: number;
  deliveryType: string;
}

interface IVtexMiniCart {
  buyer: IVtexBuyer;
  shippingAddress: IVtexShippingAddress;
  billingAddress: IVtexBillingAddress;
  items: IVtexItem[];
  shippingValue: number;
  taxValue: number;
}

interface IVtexMerchantSettings {
  name: string;
  type: string;
}

export interface IVtexBody {
  status: string;
  paymentId: string;
}
