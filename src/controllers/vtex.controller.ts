import { Logger, catchAsync } from 'conexa-core-server';
import vtexPackage from 'vtex-package-ts';
import { Request, Response } from 'express';
import { customFields, paymentMethods as paymentMethodsAvailable } from '../config/manifest';

const { payments: vtex } = vtexPackage;

const manifest = catchAsync(async (_req: Request, res: Response) => {
  Logger.info('===== MANIFEST =====');
  res.json(vtex.manifest(paymentMethodsAvailable, customFields));
});

const paymentMethods = catchAsync(async (_req: Request, res: Response) => {
  Logger.info('===== PAYMENT METHODS =====');
  res.json(paymentMethodsAvailable);
});

const payments = catchAsync(async (req: Request, res: Response) => {
  Logger.info('===== PAYMENT =====');
  const { body } = req;
  const { orderId } = body;

  const merchantData = await vtex.getMerchantData(body, customFields);
  const paymentAppData = {
    appName: 'guatapay.vtex', // todo: check if this is the correct name
    payload: { orderId }, // todo: check what front needs
  };

  const dataToVtex = {
    status: 'undefined',
    ...merchantData,
    ...paymentAppData,
  };

  Logger.info('===== PAYMENT APP INIT =====');
  res.status(200).send(dataToVtex);
});

const cancellations = catchAsync(async (req: Request, res: Response) => {
  Logger.info('===== CANCELLATION =====');
  const { payload, status } = vtex.cancellationPaymentResponse(req.body);
  Logger.error('===== CANCELLATION MUST BE DONE MANUALLY =====');
  res.status(status).send(payload);
});

const refunds = catchAsync(async (req: Request, res: Response) => {
  Logger.info('===== REFUNDS =====');
  const { payload, status } = vtex.refundPaymentResponse(req.body);
  Logger.error('===== REFUNDS MUST BE DONE MANUALLY =====');
  res.status(status).send(payload);
});

const settlements = catchAsync(async (req: Request, res: Response) => {
  Logger.info('===== SETTLEMENTS =====');
  const response = vtex.settlementsPaymentResponse(req.body);
  res.status(200).json(response);
});

export default { manifest, paymentMethods, payments, cancellations, refunds, settlements };
