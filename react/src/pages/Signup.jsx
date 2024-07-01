import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/reducers/userReducer";
import { Link } from "react-router-dom";
import { useAlert } from "../components/AlertProvider";
import { setCartItems } from "../redux/reducers/cartReducers";
import { syncCartData } from "../services/cartServices";

const Signup = () => {
  const dispatch = useDispatch();
  const showAlert = useAlert();

  //getting cart items from state
  const { cartItems } = useSelector((state) => state.cartData);

  // state to maintai data of user
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const validateName = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    let errorMsg = "";

    if (userData.name === "") {
      errorMsg = "Name is required";
    } else if (userData.name.length < 2 || userData.name.length > 30) {
      errorMsg = "Name should be between 2 to 30 characters";
    } else if (!nameRegex.test(userData.name)) {
      errorMsg = "Name should contain alphabets and spaces";
    }

    setError((prevError) => ({ ...prevError, name: errorMsg }));
    return errorMsg === "";
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errorMsg = "";

    if (userData.email === "") {
      errorMsg = "Email is required";
    } else if (!emailRegex.test(userData.email)) {
      errorMsg = "Email is not valid";
    }

    setError((prevError) => ({ ...prevError, email: errorMsg }));
    return errorMsg === "";
  };

  const validatePhone = () => {
    const phoneRegex = /^\d{10}$/;
    let errorMsg = "";

    if (userData.phone === "") {
      errorMsg = "Number is required";
    } else if (!phoneRegex.test(userData.phone)) {
      errorMsg = "Invalid phone number";
    }

    setError((prevError) => ({ ...prevError, phone: errorMsg }));
    return errorMsg === "";
  };

  const validatePassword = () => {
    let errorMsg = "";

    if (userData.password === "") {
      errorMsg = "Password is required";
    } else if (userData.password.length < 6) {
      errorMsg = "Password should be at least 6 characters";
    }

    setError((prevError) => ({ ...prevError, password: errorMsg }));
    return errorMsg === "";
  };

  const validateConfirmPassword = () => {
    let errorMsg = "";

    if (userData.confirmPassword === "") {
      errorMsg = "Confirm Password is required";
    } else if (userData.password !== userData.confirmPassword) {
      errorMsg = "Password and Confirm Password should be the same";
    }

    setError((prevError) => ({ ...prevError, confirmPassword: errorMsg }));
    return errorMsg === "";
  };

  const validateForm = () => {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    return (
      isNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    );
  };

  // to handle the changes in user Data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // will submit the data to backend
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // creating the user registration object
    const registerData = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
    };

    // sending data to backend through reducer
    dispatch(registerUser(registerData)).then((data) => {
      // clearing the state after sign up
      setUserData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      // cheking if the user registered successfully or not
      if (data.payload) {
        showAlert("User sign up successfully", "success");

        // setting all local cart items to registered users cart db
        syncCartData(cartItems).then((res) => {
          const cartItems = res.data.data.items;
          if (cartItems) {
            // setting all the cart items fetched from registered users cart db
            dispatch(setCartItems(cartItems));
          }
        });
      }

      // if getting error in user registration
      if (data.error) {
        showAlert(data.error.message, "error");
      }
    });
  };

  return (
    <section className="bg-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white border-2 border-black border-opacity-20 rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </h1>
            <form
              // className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
              method="POST"
            >
              <div className={error.name !== "" ? "" : "mb-6"}>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter your Name"
                  // required
                  // pattern="[A-Za-z ]+"
                  // title="Name can only contain letters and spaces"
                  value={userData.name}
                  onChange={handleChange}
                />
                <span className="text-sm font-normal text-red-600">
                  {error.name !== "" ? error.name : ""}
                </span>
              </div>
              <div className={error.email !== "" ? "" : "mb-6"}>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter your Email"
                  value={userData.email}
                  onChange={handleChange}
                />
                <span className="text-sm font-normal text-red-600">
                  {error.email !== "" ? error.email : ""}
                </span>
              </div>
              <div className={error.phone !== "" ? "" : "mb-6"}>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Phone
                </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter your Phone"
                  // required
                  // pattern="\d{10}"
                  // title="Phone number must be exactly 10 digits"
                  value={userData.phone}
                  onChange={handleChange}
                />
                <span className="text-sm font-normal text-red-600">
                  {error.phone !== "" ? error.phone : ""}
                </span>
              </div>
              <div className={error.password !== "" ? "" : "mb-6"}>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={userData.password}
                  onChange={handleChange}
                />
                <span className="text-sm font-normal text-red-600">
                  {error.password !== "" ? error.password : ""}
                </span>
              </div>
              <div className={error.confirmPassword !== "" ? "" : "mb-6"}>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                />
                <span className="text-sm font-normal text-red-600">
                  {error.confirmPassword !== "" ? error.confirmPassword : ""}
                </span>
              </div>

              <button
                type="submit"
                className="w-full text-black bg-gray-300 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 mt-4">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="font-medium text-primary-600 hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
