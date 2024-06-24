import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../components/AlertProvider";

const CheckOut = () => {
  const navigate = useNavigate();
  const showAlert = useAlert();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCheckOutData({ ...checkOutData, [name]: value });
  };

  const makePayment = () => {
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
      navigate("/payment");
    } else {
    }
  };
  const cancelPayment = () => {
    navigate("/");
  };
  return (
    <div className="font-[sans-serif] bg-white">
      <div className="flex justify-center my-9 max-sm:flex-col gap-12 max-lg:gap-4 h-full">
        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800">
            Complete your order
          </h2>
          <form className="mt-8">
            <div>
              <h3 className="text-base text-gray-800 mb-4">Personal Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
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
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    name="lname"
                    value={checkOutData.lname}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    name="email"
                    value={checkOutData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <input
                    type="number"
                    placeholder="Phone No."
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    name="phone"
                    value={checkOutData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-base text-gray-800 mb-4">Shipping Address</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Address Line"
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    name="address"
                    value={checkOutData.address}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="City"
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    name="city"
                    value={checkOutData.city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="State"
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    name="state"
                    value={checkOutData.state}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    name="zip"
                    value={checkOutData.zip}
                    onChange={handleChange}
                  />
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
    </div>
  );
};

export default CheckOut;
