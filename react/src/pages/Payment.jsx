import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../components/AlertProvider";
import { processCartToOrder } from "../services/cartServices";
import { StringConstants } from "../utils/stringConstants";
import { clearCart } from "../redux/reducers/cartReducers";

const Payment = () => {
  const { cartItems } = useSelector((state) => state.cartData);
  const navigate = useNavigate();
  const showAlert = useAlert();
  const dispatch = useDispatch();

  const [paymentData, setPaymentData] = useState({
    name: "",
    card: "",
    exp: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const validateCardNumber = (cardNumber) => /^\d{16}$/.test(cardNumber);

  const validateExpiryDate = (expiryDate) => {
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryDatePattern.test(expiryDate)) {
      return false;
    }

    const [month, year] = expiryDate.split("/").map(Number);
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // JavaScript months are 0-11
    const currentYear = now.getFullYear() % 100; // Get last two digits of the year

    return !(
      year < currentYear ||
      (year === currentYear && month < currentMonth)
    );
  };

  const validateCVV = (cvv) => /^\d{3,4}$/.test(cvv);

  const confirmPayment = (e) => {
    e.preventDefault();
    if (!validateCardNumber(paymentData.card)) {
      return showAlert("Invalid Card Number", "error");
    }

    if (!validateExpiryDate(paymentData.exp)) {
      return showAlert("Invalid Expiry Date", "error");
    }
    if (!validateCVV(paymentData.cvv)) {
      return showAlert("Invalid CVV", "error");
    }

    processCartToOrder()
      .then((data) => {
        if (data) {
          showAlert("order placed successfully", "success");
          dispatch(clearCart());
          navigate("/");
        }
      })
      .catch((error) => {
        showAlert("Payment Failed", "error");
      });
  };
  const totalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="font-[sans-serif] bg-white p-4 h-[90vh] flex flex-col justify-center">
      <div className="md:max-w-5xl max-w-xl mx-auto ">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 max-md:order-1">
            <h2 className="text-3xl font-extrabold text-gray-800">
              Make a payment
            </h2>
            <p className="text-gray-800 text-sm mt-4">
              Complete your transaction swiftly and securely with our
              easy-to-use payment process.
            </p>

            <form className="mt-8 max-w-lg">
              <div className="grid gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Cardholder's Name"
                    className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                    name="name"
                    value={paymentData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex bg-gray-100 border rounded-md focus-within:border-purple-500 focus-within:bg-transparent overflow-hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 ml-3"
                    viewBox="0 0 32 20"
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="10"
                      fill="#f93232"
                      data-original="#f93232"
                    />
                    <path
                      fill="#fed049"
                      d="M22 0c-2.246 0-4.312.75-5.98 2H16v.014c-.396.298-.76.634-1.107.986h2.214c.308.313.592.648.855 1H14.03a9.932 9.932 0 0 0-.667 1h5.264c.188.324.365.654.518 1h-6.291a9.833 9.833 0 0 0-.377 1h7.044c.104.326.186.661.258 1h-7.563c-.067.328-.123.66-.157 1h7.881c.039.328.06.661.06 1h-8c0 .339.027.67.06 1h7.882c-.038.339-.093.672-.162 1h-7.563c.069.341.158.673.261 1h7.044a9.833 9.833 0 0 1-.377 1h-6.291c.151.344.321.678.509 1h5.264a9.783 9.783 0 0 1-.669 1H14.03c.266.352.553.687.862 1h2.215a10.05 10.05 0 0 1-1.107.986A9.937 9.937 0 0 0 22 20c5.523 0 10-4.478 10-10S27.523 0 22 0z"
                      className="hovered-path"
                      data-original="#fed049"
                    />
                  </svg>
                  <input
                    type="number"
                    placeholder="Card Number"
                    className="px-4 py-3.5 text-gray-800 w-full text-sm outline-none bg-transparent"
                    name="card"
                    value={paymentData.card}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="string"
                      placeholder="EXP. : 01/26"
                      className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                      name="exp"
                      value={paymentData.exp}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="CVV"
                      className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 w-40 py-3.5 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600 tracking-wide"
                onClick={confirmPayment}
              >
                Pay{" "}
              </button>
            </form>
          </div>

          <div className="bg-gray-100 p-6 rounded-md">
            <h2 className="text-3xl font-extrabold text-gray-800">
              ₹ {totalPrice()}
            </h2>

            <ul className="text-gray-800 mt-8 space-y-4">
              <li className="flex flex-wrap gap-4 text-sm">
                Shipping Charges{" "}
                <span className="ml-auto font-bold">₹ 99.00</span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Tax <span className="ml-auto font-bold">₹ 200.00</span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Discount <span className="ml-auto font-bold">₹ 299.00</span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">
                Total <span className="ml-auto">₹ {totalPrice()}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
