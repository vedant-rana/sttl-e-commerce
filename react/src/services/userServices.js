import axios from "axios";
import { serverUrl } from "../utils/envVariables";

// getting server url from constants file
const BACKEND_URL = serverUrl;

// options for making request to server
const requestOptions = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * @purpose to login user with credentials
 *
 * @param email users email
 * @param password password
 * @returns POST response
 */
export const loginUserService = async (email, password) => {
  //login data object
  const loginData = {
    email,
    password,
  };

  try {
    const response = await axios.post(
      `${BACKEND_URL}/users/login`,
      loginData,
      requestOptions
    );
    return response.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

/**
 * @purpose to get logged in user details
 *
 * @returns GET response
 */
export const userDetailsService = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/users/me`, requestOptions);
    return response.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

/**
 * @purpose to login user with credentials
 *
 * @param name users name
 * @param email users email
 * @param password password
 * @param phone mobile number
 * @returns POST response
 */

export const registerUserService = async (name, email, password, phone) => {
  const registerData = {
    name,
    email,
    password,
    phone,
  };
  try {
    const response = await axios.post(
      `${BACKEND_URL}/users/register`,
      registerData,
      requestOptions
    );

    return response.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

/**
 * @purpose to log out user
 *
 * @returns GET response
 */
export const logoutUserService = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/users/logout`,
    requestOptions
  );
  return response.data;
};
