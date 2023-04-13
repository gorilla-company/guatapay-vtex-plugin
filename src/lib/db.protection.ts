import CryptoJS from 'crypto-js';
import config from '../config/config';

const encryptString = (dataString: string): string =>
  CryptoJS.AES.encrypt(dataString, config.cryptojsKey).toString();

const decryptString = (encrypted: string): string =>
  CryptoJS.AES.decrypt(encrypted, config.cryptojsKey).toString(CryptoJS.enc.Utf8);

const encryptObject = (dataObject: object): string => encryptString(JSON.stringify(dataObject));

const decryptObject = (encrypted: string): any => JSON.parse(decryptString(encrypted));

export const protectedObject = {
  type: Object,
  get: decryptObject,
  set: encryptObject,
};
export const protectedString = {
  type: String,
  get: decryptString,
  set: encryptString,
};
