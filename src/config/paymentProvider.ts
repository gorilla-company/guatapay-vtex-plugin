import { ICustomField } from "vtex-package-ts/dist/interfaces";

export const paymentMethods = [
    {
        name: 'Windcave',
        allowsSplit: 'disabled',
    },
];
const usernameCustomField: ICustomField = {
    name: "Username - Windcave",
    type: 'text'
}

const apiKeyCustomField: ICustomField = {
    name: "API key production - Windcave",
    type: 'text'
}

export const customFields = [
    usernameCustomField,
    apiKeyCustomField
];
