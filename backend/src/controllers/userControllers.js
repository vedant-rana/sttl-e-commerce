import { User } from "../models/User.js";
import ErrorHandler from "../utils/features/customError.js";
import { sendResponse } from "../utils/features/customResponse.js";
import { setCookieWithToken } from "../utils/features/setCookieWithToken.js";

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

  setCookieWithToken(res, result);

  return sendResponse(res, true, 201, "User Registered successfully", result);
};

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

export const getAllUsers = async (req, res, next) => {
  const allusers = await User.find();
  return sendResponse(res, true, 200, null, allusers);
};

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

export const getSingleUser = async (req, res, next) => {
  const userId = req.params.id;

  if (!userId) return next(new ErrorHandler("User Id is required", 400));

  if (userId.length !== 24)
    return next(new ErrorHandler("Invalid User Id", 400));

  const singleUser = await User.findById(userId);

  if (!singleUser) return next(new ErrorHandler("Invalid User ID", 404));
  return sendResponse(res, true, 200, null, singleUser);
};

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
