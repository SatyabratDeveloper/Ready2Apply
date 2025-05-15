/**
 * Custom error class for handling API related errors
 *
 * @param {string} message - The error message
 * @param {number} statusCode - The HTTP status code associated with the error
 * @param {Array} errors - Additional error details or validation errors
 * @param {string} stack - The stack trace for the error
 */
class ApiError extends Error {
  constructor(
    message = "Something went wrong!",
    statusCode,
    errors = [],
    stack = ""
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
    this.data = null;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
