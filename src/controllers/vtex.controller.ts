import { Logger, catchAsync } from 'conexa-core-server';
import vtexPackage from 'vtex-package-ts';
import { Request, Response } from 'express';
import { customFields, paymentMethods as paymentMethodsAvailable } from '../config/manifest';
import guatapayService from '../services/provider.service';

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
  const merchantData = await vtex.getMerchantData(body, customFields);
  const response = await guatapayService.initPayment(body, merchantData);
  Logger.info('==== MODAL IS OPEN ====');
  res.status(200).send(response);
});

const cancellations = catchAsync(async (req: Request, res: Response) => {
  Logger.info('==== CANCELLATION ====');
  const { payload, status } = vtex.cancellationPaymentResponse(req.body);
  Logger.error('==== CANCELLATION MUST BE DONE MANUALLY ====');
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
