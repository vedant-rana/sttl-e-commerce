import { Cart } from "../models/Cart.js";
import ErrorHandler from "../utils/features/customError.js";
import { sendResponse } from "../utils/features/customResponse.js";

export const createCart = async (req, res, next) => {
  const { userId, items } = req.body;

  // Validate the input
  if (!userId || !items || !Array.isArray(items) || items.length === 0) {
    return next(new ErrorHandler("User ID and items are required", 400));
  }

  // Ensure each item has product and price
  for (const item of items) {
    if (!item.product || !item.price) {
      return next(
        new ErrorHandler("Each item must have a product and price", 400)
      );
    }
  }

  const newCart = await Cart.create({ user: userId, items });

  if (!newCart) {
    return next(new ErrorHandler("Cart creation failed, try again", 500));
  }

  return sendResponse(res, true, 201, "Cart created successfully", newCart);
};

export const getCartById = async (req, res, next) => {};
