import { User } from "../models/User.js";
import ErrorHandler from "../utils/features/customError.js";
import { sendResponse } from "../utils/features/customResponse.js";
import { setCookieWithToken } from "../utils/features/setCookieWithToken.js";

/**
 * @purpose to create user object in MongoDB and register user
 *
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */
export const registerUser = async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return next(new ErrorHandler("All Fields are required", 400));
  }

  const newUser = new User({
    name,
    email,
    password,
    phone,
  });

  const result = await newUser.save();

  setCookieWithToken(res, result); // this function will set cookie to res object

  return sendResponse(res, true, 201, "User Registered successfully", result);
};

/**
 * @purpose to get all users details for admin
 *
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please enter both Email and Password", 400));

  const isUserExist = await User.findOne({ email }).select(["+password"]);

  if (!isUserExist) return next(new ErrorHandler("Invalid Credentials", 400));

  const isValidPassword = await isUserExist.comparePassword(password);

  if (!isValidPassword)
    return next(new ErrorHandler("Invalid Credentials", 400));

  setCookieWithToken(res, isUserExist);

  return sendResponse(
    res,
    true,
    200,
    "User Logged in successfully",
    isUserExist
  );
};

/**
 * @purpose to get details of logged in user
 *
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */
export const getMyDetails = async (req, res, next) => {
  const id = req.user._id;

  if (!id) return next(new ErrorHandler("Please Login First", 400));

  const userData = await User.findById(id);
  return sendResponse(res, true, 200, null, userData);
};

/**
 * @purpose to get logout user by removing cookies
 *
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */
export const logOutUser = async (req, res, next) => {
  return res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "User Logged out Successfully",
    });
};

/**
 * @purpose to get details of all Users
 *
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */
export const getAllUsers = async (req, res, next) => {
  const allusers = await User.find();
  return sendResponse(res, true, 200, null, allusers);
};

/**
 * @purpose to update details of single user through _id
 *
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */
export const updateUser = async (req, res, next) => {
  const userId = req.params.id;

  if (!userId) return next(new ErrorHandler("User Id is required", 400));

  if (userId.length !== 24)
    return next(new ErrorHandler("Invalid User Id", 400));

  const { name, email, password, phone } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      name,
      email,
      password,
      phone,
    },
    {
      new: true,
    }
  );

  if (!updatedUser) return next(new ErrorHandler("Invalid User Id", 400));

  return sendResponse(res, true, 200, "User Updated Successfully", updatedUser);
};

/**
 * @purpose to get details of single user through _id
 *
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */
export const getSingleUser = async (req, res, next) => {
  const userId = req.params.id;

  if (!userId) return next(new ErrorHandler("User Id is required", 400));

  if (userId.length !== 24)
    return next(new ErrorHandler("Invalid User Id", 400));

  const singleUser = await User.findById(userId);

  if (!singleUser) return next(new ErrorHandler("Invalid User ID", 404));
  return sendResponse(res, true, 200, null, singleUser);
};

/**
 * @purpose to delete user from the database
 *
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */

export const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  if (!userId) return next(new ErrorHandler("User Id is required", 400));

  if (userId.length !== 24)
    return next(new ErrorHandler("Invalid User Id", 400));

  const singleUser = await User.findById(userId);

  if (!singleUser) return next(new ErrorHandler("Invalid User ID", 404));

  await User.deleteOne({ _id: userId });

  return sendResponse(res, true, 200, "User Deleted Successfully");
};
