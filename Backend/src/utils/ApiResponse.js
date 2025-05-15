/**
 * Class to standardize API responses
 *
 * @param {number} statusCode - The HTTP status code for the response
 * @param {Object} data - The payload to be returned in the response
 * @param {string} message - Message describing the response (default: "Success")
 */
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export default ApiResponse;
