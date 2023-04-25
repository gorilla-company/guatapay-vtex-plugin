import { Logger, catchAsync } from 'conexa-core-server';
import vtexPackage from 'vtex-package-ts';
import { Request, Response } from 'express';
import { customFields, paymentMethods as paymentMethodsAvailable } from '../config/manifest';
import guatapayService from '../services/provider.service';
import { findTransaction } from '../services/database/transaction.service';
import { paymentInitResponse } from '../lib/provider';

const { payments: vtex } = vtexPackage;

const manifest = catchAsync(async (_req: Request, res: Response) => {
  Logger.info('==== MANIFEST ====');
  res.json(vtex.manifest(paymentMethodsAvailable, customFields));
});

const paymentMethods = catchAsync(async (_req: Request, res: Response) => {
  Logger.info('==== PAYMENT METHODS ====');
  res.json(paymentMethodsAvailable);
});

const payments = catchAsync(async (req: Request, res: Response) => {
  Logger.info('==== VTEX INIT PAYMENT ====');
  const { body } = req;
  const transactionFound = await findTransaction({ orderId: body.orderId });

  if (transactionFound) {
    Logger.error('Transaction already exists');
    res.status(200).json(paymentInitResponse(transactionFound));
    return;
  }

  const merchantData = await vtex.getMerchantData(body, customFields);
  Logger.info('==== MODAL IS OPEN ====');
  res.status(200).send(await guatapayService.initPayment(body, merchantData));
});

const cancellations = catchAsync(async (req: Request, res: Response) => {
  Logger.info('==== VTEX INIT CANCELLATION ====');
  const { payload, status } = await guatapayService.createCancellation(req.body);
  res.status(status).send(payload);
});

const refunds = catchAsync(async (req: Request, res: Response) => {
  Logger.info('==== REFUNDS ====');
  const { payload, status } = vtex.refundPaymentResponse(req.body);
  Logger.error('===== REFUNDS MUST BE DONE MANUALLY =====');
  res.status(status).send(payload);
});

const settlements = catchAsync(async (req: Request, res: Response) => {
  Logger.info('==== SETTLEMENTS ====');
  const response = vtex.settlementsPaymentResponse(req.body);
  res.status(200).json(response);
});

export default { manifest, paymentMethods, payments, cancellations, refunds, settlements };
