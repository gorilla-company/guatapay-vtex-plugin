import { ICustomField } from 'vtex-package-ts/dist/interfaces';

export const paymentMethods = [
  {
    name: 'Guatapay',
    allowsSplit: 'disabled',
  },
];
const clientIdCustomField: ICustomField = {
  name: 'Client ID - Guatapay',
  type: 'text',
};

const clientSecretCustomField: ICustomField = {
  name: 'Client Secret - Guatapay',
  type: 'text',
};

export const customFields = [clientIdCustomField, clientSecretCustomField];
