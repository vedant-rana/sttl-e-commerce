import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/reducers/userReducer";
import { Link } from "react-router-dom";
import { useAlert } from "../components/AlertProvider";

const Login = () => {
  const dispatch = useDispatch();
  const showAlert = useAlert();

  const [userData, setUserData] = useState({
    email: "test@gmail.com",
    password: "123456",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      email: userData.email,
      password: userData.password,
    };

    dispatch(loginUser(loginData)).then((data) => {
      setUserData({
        email: "",
        password: "",
      });

      if (data.payload) {
        showAlert("User logged in successfully", "success");
      }
      if (data.error) {
        showAlert(data.error.message, "error");
      }
    });
  };

  return (
    <section className="bg-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[90vh] lg:py-0">
        <div className="w-full bg-white border-2 border-black border-opacity-20 rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
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
                  required
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
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
                  required
                  value={userData.password}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="w-full text-black bg-gray-300 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500">
                Don;t have an account?{" "}
                <Link
                  to={"/register"}
                  className="font-medium text-primary-600 hover:underline"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
