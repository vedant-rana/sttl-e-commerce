import axios from "axios";
import { serverUrl } from "../utils/envVariables";

// getting server url from constants file
const BACKEND_URL = serverUrl;

// options for making request to server
const requestOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * @purpose service to get all products from db
 *
 * @returns GET response
 */
export const getAllProductsServices = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/products/all`,
      requestOptions
    );
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

/**
 * @purpose service to get single product from db
 *
 * @returns GET response
 */
export const getSingleProductService = async (productId) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/products/${productId}`,
      requestOptions
    );
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};
