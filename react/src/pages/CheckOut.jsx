import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../components/AlertProvider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { processCartToOrder } from "../services/cartServices";
import { clearCart } from "../redux/reducers/cartReducers";

const CheckOut = () => {
  const navigate = useNavigate();
  const showAlert = useAlert();
  const { user } = useSelector((state) => state.userData);
  const { cartItems } = useSelector((state) => state.cartData);

  const dispatch = useDispatch();

  // checkout data form fields
  const [checkOutData, setCheckOutData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // payment methods
  const [payment, setPayment] = useState("");

  // handle changes in checkout data fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCheckOutData({ ...checkOutData, [name]: value });
  };

  //handling payment methods change
  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  // handle checkout form submit
  const makePayment = () => {
    // checking checkout data fields is empty or not
    if (
      !checkOutData.fname ||
      !checkOutData.lname ||
      !checkOutData.email ||
      !checkOutData.phone ||
      !checkOutData.address ||
      !checkOutData.city ||
      !checkOutData.state ||
      !checkOutData.zip
    ) {
      showAlert("Please enter all the Fields ", "error");
      return;
    }

    // mobile phone length check
    if (checkOutData.phone.length != 10) {
      showAlert("Invalid phone number", "error");
      return;
    }

    // zip code length check
    if (checkOutData.zip.length != 6) {
      showAlert("Invalid zip code", "error");
      return;
    }

    // payment method check
    if (payment == "") {
      showAlert("Please select a payment method", "error");
      return;
    }

    // if user is logged in or not
    if (user) {
      // processing order  from cart items
      processCartToOrder().then((res) => {
        if (res.data) {
          // clearing the local cart
          dispatch(clearCart());
          showAlert("Order Placed Successfully", "success");
          navigate("/");
        }
      });
    } else {
      return showAlert("Login to place Order", "error");
    }
  };

  //hadling cancel payment
  const cancelPayment = () => {
    navigate("/");
  };

  const totalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="font-[sans-serif] bg-white flex justify-center">
      <div className="flex w-5/6 justify-between h-full">
        <div className="flex justify-center w-[65%] my-9 max-sm:flex-col gap-12 max-lg:gap-4 h-full">
          <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
            <h2 className="text-2xl font-bold text-gray-800">
              Complete your order
            </h2>
            <form className="mt-8">
              <div>
                <h3 className="text-base text-gray-800 mb-4">
                  Personal Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-gray-600"
                      id="fname"
                      name="fname"
                      value={checkOutData.fname}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-gray-600"
                      name="lname"
                      value={checkOutData.lname}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-gray-600"
                      name="email"
                      value={checkOutData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <input
                      type="number"
                      placeholder="Phone No."
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-gray-600"
                      name="phone"
                      value={checkOutData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-base text-gray-800 mb-4">
                  Shipping Address
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Address Line"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-gray-600"
                      name="address"
                      value={checkOutData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="City"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-gray-600"
                      name="city"
                      value={checkOutData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="State"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-gray-600"
                      name="state"
                      value={checkOutData.state}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Zip Code"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-gray-600"
                      name="zip"
                      value={checkOutData.zip}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-base text-gray-800 mb-4">
                    Select Payment Method
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-gray-100 border border-gray-300 text-gray-800 py-3 px-4 pr-8 rounded-md focus:bg-transparent focus:border-gray-500 focus:outline-none"
                        aria-label="Select Version"
                        aria-placeholder="Select"
                        name="payment"
                        value={payment}
                        onChange={handlePayment}
                      >
                        <option value="">Select Payment Method</option>
                        <option value="cheque">Cheque</option>
                        <option value="cod">Cash On Delivery</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-800">
                        <KeyboardArrowDownIcon />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 max-md:flex-col mt-8">
                  <button
                    type="button"
                    className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1"
                    onClick={cancelPayment}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={makePayment}
                  >
                    Complete Purchase
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="bg-gray-100 p-6 w-[30%] h-[90%] my-auto rounded-md border-2 border-gray-200">
          {/* <h2 className="text-3xl text-end font-extrabold text-gray-800">
            ₹ {totalPrice()}
          </h2> */}

          <ul className="text-gray-800 mt-8 space-y-4">
            <li className="flex flex-wrap gap-4 text-xl">
              Total
              <span className="ml-auto font-bold ">₹ {totalPrice()}</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Shipping Charges
              <span className="ml-auto font-bold">₹ 99.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Tax <span className="ml-auto font-bold">₹ 200.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Discount{" "}
              <span className="ml-auto font-bold text-green-600">
                - ₹ 299.00
              </span>
            </li>
            <li className="flex flex-wrap gap-4 text-2xl font-bold border-t-2 border-gray-300 pt-4">
              Grand Total <span className="ml-auto">₹ {totalPrice()}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
