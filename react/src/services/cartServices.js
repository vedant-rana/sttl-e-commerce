import axios from "axios";
import { serverUrl } from "../utils/envVariables";
import { useDispatch } from "react-redux";

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const syncCartData = async (cartItems) => {
  const response = await axios.post(
    `${serverUrl}/cart/sync`,
    { items: cartItems },
    requestOptions
  );
  // const response = await axios.get(`${serverUrl}/cart`, requestOptions);

  return response.data;
};

export const manageQuantityService = async ({ productId, quantity }) => {
  const response = await axios.put(
    `${serverUrl}/cart/item`,
    { productId, quantity },
    requestOptions
  );
  return response.data;
};

export const removeItemService = async (productId) => {
  const response = await axios.delete(
    `${serverUrl}/cart/item/${productId}`,
    requestOptions
  );
  return response.data;
};

export const processCartToOrder = async () => {
  const response = await axios.get(`${serverUrl}/cart/process`, requestOptions);
  return response.data;
};
