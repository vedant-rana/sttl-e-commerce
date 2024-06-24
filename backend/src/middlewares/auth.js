import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/features/customError.js";
import { TryCatch } from "../utils/features/tryCatch.js";

/**
 * @purpose to check if the user is authorized to access a route
 *
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */
export const isAuthorized = TryCatch(async (req, res, next) => {
  const { token } = req.cookies; // Extract the token from the cookies

  if (!token) return next(new ErrorHandler("Login to Access the Page")); // If no token, send an error response

  const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key

  req.user = await User.findById(decoded.id); // Find the user associated with the token and attach to req.user

  next(); // Proceed to the next middleware or route handler
});
