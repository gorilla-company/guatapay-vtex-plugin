import supertest from 'supertest';
import app from '../../app';
import setupTestDB from '../setupTestDB';
import {
  cancelPaymentManual,
  invalidPayment,
  refundPaymentNotImp,
  settleResponse,
  validPayment,
  vtexManifest,
} from '../mocks/vtex/vtex.mock';
import { userMock } from '../mocks/database/user';
import User from '../../models/User.model';
import Transaction from '../../models/Transaction.model';
import { transactionMock } from '../mocks/database/transaction';

const api = supertest(app);
const apiRoute: string = '/api/v1';

describe('Vitals functions', () => {
  setupTestDB();

  it('Should return 200 to welcome function', async () => {
    await api.get(`/`).expect(200);
  });

  it('Should return 200 to dbCheck function', async () => {
    await api.get(`/dbCheck`).expect(200);
  });
});

describe('Vtex payments functions', () => {
  setupTestDB();

  describe('Manifest and Payment Method process', () => {
    it('Should return 200 with valid manifest object for getManifest', async () => {
      await api
        .get(`${apiRoute}/vtex/manifest`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
          expect(res.body).toMatchObject(vtexManifest);
        });
    });

    it('Should return 200 with valid payment object for get payments methods', async () => {
      await api
        .get(`${apiRoute}/vtex/payment-methods`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
          expect(res.body).toMatchObject(vtexManifest.paymentMethods);
        });
    });
  });

  describe('Payment process', () => {
    it('Should return 500 with invalid merchant data', async () => {
      await User.create(userMock);

      await api
        .post(`${apiRoute}/vtex/payments`)
        .send(invalidPayment)
        .expect(500)
        .expect('Content-Type', /application\/json/);
    });

    it('Should return 200 and correct props from payments', async () => {
      await User.create(userMock);
      await api
        .post(`${apiRoute}/vtex/payments`)
        .send(validPayment)
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe('undefined');
          expect(res.body.paymentAppData.appName).toBe('guatapay.vtex');
        });
    });

    it('Payment intent should return 400 because bad request', async () => {
      const paymentWithInvalidValue = { ...validPayment, value: null };

      await User.create(userMock);
      await api.post(`${apiRoute}/vtex/payments`).send(paymentWithInvalidValue).expect(400);
    });
  });

  describe('Cancellation process', () => {
    it('Should return 501 with with cancel-manually code response', async () => {
      await User.create(userMock);
      await Transaction.create(transactionMock);
      await api
        .post(`${apiRoute}/vtex/payments/1/cancellations`)
        .send(cancelPaymentManual)
        .expect(501)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
          expect(res.body.code).toBe('cancel-manually');
        });
    });

    it('Should return 400 with fake body input', async () => {
      await api
        .post(`${apiRoute}/vtex/payments/1/cancellations`)
        .send({})
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });
  });

  describe('Refunds process', () => {
    it('Should return 501 with with refund-manually code response', async () => {
      await api
        .post(`${apiRoute}/vtex/payments/1/refunds`)
        .send(refundPaymentNotImp)
        .expect(501)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
          expect(res.body.code).toBe('refund-manually');
        });
    });
  });

  describe('Settlements process', () => {
    it('Should return 200 with transaction settled message', async () => {
      await api
        .post(`${apiRoute}/vtex/payments/1/settlements`)
        .send(settleResponse)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
          expect(res.body.message).toBe('transaction settled');
        });
    });
  });
});

describe('Payment app endpoints', () => {
  setupTestDB();

  describe('Quotation endpoint', () => {
    it('Should return 200 and quotation amounts should be numbers', async () => {
      await api
        .post(`${apiRoute}/payment-app/quotation`)
        .send({ currency: 'btc', amount: 10000 })
        .expect(200)
        .expect((res) => expect(typeof res.body.crypto.amount).toBe('number'))
        .expect((res) => expect(typeof res.body.fiat.amount).toBe('number'));
    });

    it('Quotation should return bad request', async () => {
      await api.post(`${apiRoute}/payment-app/quotation`).send({ currency: 'btc', amount: 1 }).expect(400);
    });
  });

  describe('Intent payment endpoint', () => {
    it('Should be 200 and create a intent payment', async () => {
      await User.create(userMock);
      await Transaction.create(transactionMock);

      await api
        .post(`${apiRoute}/payment-app/create-payment-intent`)
        .send({
          currency: 'btc',
          paymentId: transactionMock.vtexPaymentId,
        })
        .expect(200)
        .expect((res) => {
          const { qrString, crypto, fiat, paymentId } = res.body;
          expect(qrString).toBeDefined();
          expect(crypto).toBeDefined();
          expect(fiat).toBeDefined();
          expect(paymentId).toBeDefined();
        });
    });

    it('Create payment intent should return transaction not found', async () => {
      await User.create(userMock);
      await Transaction.create(transactionMock);

      await api
        .post(`${apiRoute}/payment-app/create-payment-intent`)
        .send({
          currency: 'btc',
          paymentId: 'fail-vtex-id',
        })
        .expect(404);
    });

    it('Create payment intent should return bad request because bad currency', async () => {
      await User.create(userMock);
      await Transaction.create(transactionMock);

      await api
        .post(`${apiRoute}/payment-app/create-payment-intent`)
        .send({
          currency: 'luna',
          paymentId: transactionMock.vtexPaymentId,
        })
        .expect(500);
    });
  });
});

// describe('Cron and webhooks', () => {
//   setupTestDB();

//   it('Update payment should return error because guatapay payment id is wrong', async () => {
//     await Transaction.create(transactionMock);
//     await providerService
//       .updatePayment(transactionMock.vtexPaymentId)
//       // eslint-disable-next-line jest/no-conditional-expect
//       .catch((err) => expect(err.statusCode).toBe(400));
//   });

//   it('Update payment status is pending, so response is undefined', async () => {
//     await User.create(userMock);
//     await Transaction.create(transactionMock);

//     await api
//       .post(`${apiRoute}/payment-app/create-payment-intent`)
//       .send({
//         currency: 'btc',
//         paymentId: transactionMock.vtexPaymentId,
//       })
//       .expect(200);

//     const response = await providerService.updatePayment(transactionMock.vtexPaymentId);
//     expect(response).toBeUndefined();
//   });
// });
