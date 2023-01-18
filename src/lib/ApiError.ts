class ApiError extends Error {
  success: boolean;

  statusCode: number;

  code?: string;

  isOperational?: boolean;

  override stack?: string;

  constructor(statusCode: number, message: string, code?: string, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.success = false;
    this.code = code || String(statusCode);

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
