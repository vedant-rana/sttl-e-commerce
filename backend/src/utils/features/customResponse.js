/**
 * Sends a JSON response with optional success status, message, data, and token.
 * @param {object} res - The response object from Express.js.
 * @param {boolean} success - The success status of the response.
 * @param {number} statusCode - The HTTP status code of the response.
 * @param {string} [message] - Optional message to include in the response.
 * @param {object} [data] - Optional data object to include in the response.
 * @param {string} [token] - Optional token to include in the response.
 */

export const sendResponse = (
  res,
  success,
  statusCode,
  message,
  data,
  token
) => {
  const response = {
    success,
  };
  if (message) response.message = message;
  if (data) response.data = data;
  if (token) response.token = token;
  return res.status(statusCode).json(response);
};
