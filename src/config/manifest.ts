import { ICustomField } from 'vtex-package-ts/dist/interfaces';

export const paymentMethods = [
  {
    name: 'Guatapay',
    allowsSplit: 'disabled',
  },
];

export const customFields: ICustomField[] = [
  {
    name: 'Client ID - Guatapay',
    type: 'text',
  },
  {
    name: 'Client Secret - Guatapay',
    type: 'text',
  },
];
