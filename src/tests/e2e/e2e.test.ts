import supertest from 'supertest';
import app from '../../app';
import setupTestDB from '../setupTestDB';
import { cancelPaymentManual, invalidPayment, refundPaymentNotImp, settleResponse, validPayment, vtexManifest, vtexPaymentMethods } from '../mocks/vtex/vtex.mock';

import { setupVtexApi } from '../mocks/api/vtex.api';


const api = supertest(app);
const apiRoute:string = '/api/v1';

setupVtexApi();
//////////////////////////////////////////////////////////
////////////////   VITALS FUNCTIONS   ////////////////
//////////////////////////////////////////////////////////
describe('Vitals functions ', () =>{
    setupTestDB();
    it ('Should return 200 to welcome function', async () =>{
        await api
        .get(`/`)
        .expect(200)
        
    })

    it ('Should return 200 to dbCheck function', async () =>{
        await api
        .get(`/dbCheck`)
        .expect(200) 
    })

});




//////////////////////////////////////////////////////////
////////////////   WEBHOOK FUNCTIONS   ////////////////
//////////////////////////////////////////////////////////
describe('Payments functions ', () =>{
    setupTestDB();
 
    describe('Manifest and Payment Method process', () =>{
        it('Should return 200 with valid manifest object for getManifest', async () =>{
            await api
            .get(`${apiRoute}/vtex/manifest`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect((res) => {
                expect(res.body).toMatchObject(vtexManifest)
            })
        });
        it('Should return 200 with valid payment object for get payments methods', async () =>{
            await api
            .get(`${apiRoute}/vtex/payment-methods`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect((res) => {
                expect(res.body).toMatchObject(vtexPaymentMethods)
            })
        });
    });

    describe('Payment process', () =>{

        it ('Should return 500 with invalid merchant data', async () =>{
            await api
            .post(`${apiRoute}/vtex/payments`)
            .send(invalidPayment)
            .expect(500)
            .expect('Content-Type', /application\/json/)
        })

        it ('Should return 200 and status undefined', async () =>{
            await api
            .post(`${apiRoute}/vtex/payments`)
            .send(validPayment)
            .expect(200)
            .expect((res) =>{
                
                expect(res.body.status).toBe('undefined')
            })
        })
    });

    describe('Cancellation process', () =>{

        it ('Should return 501 with with cancel-manually code response', async () =>{
            await api
            .post(`${apiRoute}/vtex/payments/1/cancellations`)
            .send(cancelPaymentManual)
            .expect(501)
            .expect('Content-Type', /application\/json/)
            .expect((res) => {
                expect(res.body.code).toBe('cancel-manually')
            });
        })
    
        it ('Should return 500 with fake body input', async () =>{
            await api
            .post(`${apiRoute}/vtex/payments/1/cancellations`)
            .send({})
            .expect(500)
            .expect('Content-Type', /application\/json/)
        })
    
       
    });

    describe('Refunds process', () =>{

        it ('Should return 501 with with refund-manually code response', async () =>{
            await api
            .post(`${apiRoute}/vtex/payments/1/refunds`)
            .send(refundPaymentNotImp)
            .expect(501)
            .expect('Content-Type', /application\/json/)
            .expect((res) => {
                expect(res.body.code).toBe('refund-manually')
            });
        })
    
        it ('Should return 500 with fake body input', async () =>{
            await api
            .post(`${apiRoute}/vtex/payments/1/refunds`)
            .send({})
            .expect(500)
            .expect('Content-Type', /application\/json/)
        })
    
       
    });

    describe('Settlements process', () =>{

        it ('Should return 200 with transaction settled message', async () =>{
            await api
            .post(`${apiRoute}/vtex/payments/1/settlements`)
            .send(settleResponse)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect((res) => {
                expect(res.body.message).toBe('transaction settled')
            });
        })
    
    });

});


//////////////////////////////////////////////////////////
////////////////   WEBHOOK FUNCTIONS   ////////////////
//////////////////////////////////////////////////////////
describe('IPN functions ', () =>{
    
    //TODO: Implement IPN function


});