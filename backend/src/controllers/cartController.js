import { Cart } from "../models/Cart.js";
import ErrorHandler from "../utils/features/customError.js";
import { sendResponse } from "../utils/features/customResponse.js";

/**
 * @purpose to sync cart with existing database data
 *
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */
export const syncCart = async (req, res, next) => {
  const { items } = req.body;

  console.log(items);

  let cartData;

  // Check whether the user already has a cart with isPurchased value false
  const isCartExist = await Cart.findOne({
    user: req.user._id,
    isPurchased: false,
  });

  if (isCartExist) {
    // Update existing cart
    for (const newItem of items) {
      const existingItemIndex = isCartExist.items.findIndex(
        (item) => String(item.productId) === newItem.productId
      );

      if (existingItemIndex < 0) {
        // Product is not in the cart, add it
        isCartExist.items.push({
          productId: newItem.productId,
          quantity: newItem.quantity,
          price: newItem.price,
          name: newItem.name,
          image: newItem.image,
        });
      }
    }

    cartData = await isCartExist.save();
  } else {
    // Create a new cart
    cartData = await Cart.create({
      user: req.user._id,
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        image: item.image,
      })),
    });
  }

  if (!cartData) {
    return next(new ErrorHandler("Cart creation failed, try again", 500));
  }

  return sendResponse(res, true, 201, "Cart created successfully", cartData);
};

/**
 * @purpose to get the cart for a user
 *
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */
export const getCartForUser = async (req, res, next) => {
  const usersCart = await Cart.findOne({
    user: req.user._id,
    isPurchased: false,
  });

  if (!usersCart)
    return next(new ErrorHandler("User doesn't have any cart", 400));

  return sendResponse(res, true, 200, null, usersCart);
};

/**
 * @purpose to delete an item from the cart
 *
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */
export const deleteItemFromCart = async (req, res, next) => {
  const { productId } = req.params;
  let cartData;

  // Check whether the user already has a cart with isPurchased value false
  const isCartExist = await Cart.findOne({
    user: req.user._id,
    isPurchased: false,
  });

  if (isCartExist) {
    // Filter out the item to be deleted from the cart
    isCartExist.items = isCartExist.items.filter(
      (item) => String(item.productId) !== productId
    );
  }
  console.log(isCartExist.items);

  cartData = await isCartExist.save();

  return sendResponse(res, true, 200, "item removed successfully");
};

/**
 * @purpose to manage the quantity of items in the cart
 *
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */
export const manageQuantity = async (req, res, next) => {
  const { productId, quantity } = req.body;

  let cartData;

  // Check whether the user already has a cart with isPurchased value false
  const isCartExist = await Cart.findOne({
    user: req.user._id,
    isPurchased: false,
  });

  if (isCartExist) {
    const index = isCartExist.items.findIndex(
      (item) => String(item.productId) === productId
    );
    if (index > -1) {
      // Update the quantity of the item
      isCartExist.items[index].quantity = quantity;
      // Ensure quantity is within the allowed range (1-10)
      if (isCartExist.items[index].quantity > 9) {
        isCartExist.items[index].quantity = 10;
      } else if (isCartExist.items[index].quantity < 1) {
        isCartExist.items[index].quantity = 1;
      }
    }
    cartData = await isCartExist.save();
  }

  return sendResponse(res, true, 200, null, cartData);
};

/**
 * @purpose to convert the cart to an order
 *
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */
export const convertCartToOrder = async (req, res, next) => {
  const userId = req.user._id;

  // Find the cart that is to be converted to an order
  const order = await Cart.findOne({ user: userId, isPurchased: false });
  order.isPurchased = true;

  order.save();

  return sendResponse(res, true, 200, "order placed successfully");
};
