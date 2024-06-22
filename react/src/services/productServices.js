import axios from "axios";
import { serverUrl } from "../utils/envVariables";

const BACKEND_URL = serverUrl;

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getAllProductsServices = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/products/all`,
      requestOptions
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const getSingleProductService = async (productId) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/products/${productId}`,
      requestOptions
    );
    console.log(response.data);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};
