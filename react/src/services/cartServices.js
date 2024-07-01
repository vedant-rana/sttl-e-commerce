import axios from "axios";
import { serverUrl } from "../utils/envVariables";

// options for making request to server
const requestOptions = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

/**
 * @purpose to sync local cart items with logged in users db
 *
 * @param cartItems array of cart items or object of cart item
 * @returns POST response
 */
export const syncCartData = async (cartItems) => {
  let cartData;

  //checkimg whether cart item is already array or not if not then converting it
  if (Array.isArray(cartItems)) {
    cartData = cartItems;
  } else {
    cartData = [cartItems];
  }

  // sending cart data to server
  return await axios.post(
    `${serverUrl}/cart/sync`,
    { items: cartData },
    requestOptions
  );
};

/**
 * @purpose to manage cart items quantity with db cart items
 *
 * @param productId to find alresy exist product in cart
 * @param quantity new updated quantity
 * @returns PUT response
 */
export const manageQuantityService = async ({ productId, quantity }) => {
  return await axios.put(
    `${serverUrl}/cart/item`,
    { productId, quantity },
    requestOptions
  );
};

/**
 * @purpose to remove cart items from db cart items
 *
 * @param productId to find alresy exist product in cart and remove it
 * @returns DELETE response
 */
export const removeItemService = async (productId) => {
  return await axios.delete(
    `${serverUrl}/cart/item/${productId}`,
    requestOptions
  );
};

/**
 * @purpose to placing order using cart products
 *
 * @returns GET response
 */
export const processCartToOrder = async () => {
  return await axios.get(`${serverUrl}/cart/process`, requestOptions);
};
