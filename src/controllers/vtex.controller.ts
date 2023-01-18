/* In this controller we implement the endpoints that will be 
called by vtex payments methods  */


import { Request, Response } from 'express';
import { catchAsync } from 'conexa-core-server';
import { Logger } from 'conexa-core-server';
import { paymentMethods, customFields } from '../config/paymentProvider';
import * as windcaveService from '../services/provider.service';

import vtexPackage from 'vtex-package-ts';
const { payments: vtex } = vtexPackage;

/* This endpoint is called for listing the orders of a given user */
const manifest = catchAsync(async (_req: Request, res: Response) => {
  return res.json(vtex.manifest( paymentMethods, customFields ));
});


const paymentMethod = catchAsync(async (_req: Request, res: Response) => {
  res.json(vtex.paymentMethods(paymentMethods));
});



/**
 * Creates a new payment and/or initiates the payment flow.
 *
 * @returns {Response} response with object to redirect payment
 */
const payment = catchAsync(async (req: Request, res: Response) => {
  const { body } = req
  Logger.debug('===== PAYMENTS =====');
  // Get merchant Data
  const merchantData = await vtex.getMerchantData(
    body,
    customFields
  );
  
  Logger.debug('===== WINDCAVE CREATE SESSION =====');
  // Create a new Payment Session
  const paymentUrlResponse = await windcaveService.createSession(body, merchantData);
  const vtexResponse = vtex.paymentResponse(body,paymentUrlResponse,undefined);
  res.status(200).json(vtexResponse)
});

/**
 * Creates a cancellation for a payment.
 *
 * @returns {Response} response with object to redirect payment
 */
const cancellations = catchAsync( async (req: Request, res: Response) => {
  const { payload, status } =
    vtex.cancellationPaymentResponse(req.body);
    res.status(status).json(payload);
});

/**
 * Creates a refund for a payment.
 *
 * @returns {Response} response with object to redirect payment
 */
const refunds = catchAsync( async (req: Request, res: Response) => {
  const { payload, status } = vtex.refundPaymentResponse(req.body);
  res.status(status).json(payload);
});

/**
 * Creates a settlement for a payment.
 *
 * @returns {Response} response with object to redirect payment
 */
const settlements = catchAsync( async (req: Request, res: Response) => {
  const response = vtex.settlementsPaymentResponse(req.body);
  res.status(200).json(response);
  
});

export default {
  manifest,
  paymentMethod,
  payment,
  cancellations,
  refunds,
  settlements
};
