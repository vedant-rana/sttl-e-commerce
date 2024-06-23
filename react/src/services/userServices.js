import axios from "axios";
import { serverUrl } from "../utils/envVariables";

const BACKEND_URL = serverUrl;

const requestOptions = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

export const loginUserService = async (email, password) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/users/login`,
      {
        email,
        password,
      },
      requestOptions
    );
    return response.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const userDetailsService = async (email, password) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/users/me`, requestOptions);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const registerUserService = async (name, email, password, phone) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/users/register`,
      {
        name,
        email,
        password,
        phone,
      },
      requestOptions
    );

    return response.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const logoutUserService = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/users/logout`,
    requestOptions
  );
  return response.data;
};
