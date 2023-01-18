import { ICustomField } from "vtex-package-ts/dist/interfaces";

export const paymentMethods = [
    {
        name: 'Guatapay',
        allowsSplit: 'disabled',
    },
];
const usernameCustomField: ICustomField = {
    name: "Username - Guatapay",
    type: 'text'
}

const apiKeyCustomField: ICustomField = {
    name: "API key production - Guatapay",
    type: 'text'
}

export const customFields = [
    usernameCustomField,
    apiKeyCustomField
];
