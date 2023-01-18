import nock from 'nock';
import config from '../../../config/config';
import {transactionMock} from '../database/transaction';



export const setupVtexApi = () => {

    nock(config.windcaveUrl)
    .matchHeader('Content-Type', 'application/json')
    .post(`${transactionMock.vtexCallbackUrl}`)
    .reply(200 )
   
}