// Define a custom error handler class extending the built-in Error class
class ErrorHandler extends Error {
  /**
   * @purpose to create a custom error with a message and status code
   *
   * @param message the error message
   * @param statusCode the HTTP status code for the error
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorHandler;
