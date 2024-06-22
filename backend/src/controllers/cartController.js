import { Cart } from "../models/Cart.js";
import ErrorHandler from "../utils/features/customError.js";
import { sendResponse } from "../utils/features/customResponse.js";

export const createCart = async (req, res, next) => {
  const { items } = req.body;

  // Validate the input
  if (!items || !Array.isArray(items) || items.length === 0) {
    return next(new ErrorHandler("Items are required", 400));
  }

  // Ensure each item has product and price
  for (const item of items) {
    if (!item.product || !item.price) {
      return next(
        new ErrorHandler("Each item must have a product and price", 400)
      );
    }
  }

  console.log(req.user._id)

  const newCart = await Cart.create({ user: req.user._id, items });

  if (!newCart) {
    return next(new ErrorHandler("Cart creation failed, try again", 500));
  }

  return sendResponse(res, true, 201, "Cart created successfully", newCart);
};

export const getCartForUser = async (req, res, next) => {

  const usersCart = await Cart.findOne({ user: req.user._id });

  if (!usersCart) return next(new ErrorHandler("User doesn't have any cart", 400));

  return sendResponse(res, true, 200, null, usersCart)

};
