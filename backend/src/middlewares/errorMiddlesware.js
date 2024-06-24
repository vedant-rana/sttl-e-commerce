/**
 * @purpose to handle errors globally in the application
 *
 * @param err the error object
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */
export const errorMiddleware = (err, req, res, next) => {
  // Set default status code to 500 if not provided
  err.statusCode = err.statusCode || 500;
  // Set default error message if not provided
  err.message = err.message || "Internal Server Error";

  // Handle specific error for duplicate key error in MongoDB (e.g., duplicate email)
  if (err.code === 11000) {
    err.statusCode = 400;
    err.message = "This Email is already Registered !!!";
  }

  // Log the error for debugging purposes
  console.log(err);

  // Send the error response to the client
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
