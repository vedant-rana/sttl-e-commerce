import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartRow from "../components/CartRow";
import emptyCartImage from "../assets/empty_cart.jpg";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cartData);

  //  calculating total price of cart items
  const totalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <section className="py-24 relative">
      {cartItems.length > 0 ? (
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
            Shopping Cart
          </h2>
          <div className="hidden lg:grid grid-cols-2 py-6">
            <div className="font-normal text-xl leading-8 text-gray-500">
              Product
            </div>
            <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
              <span className="w-full max-w-[350px] text-center">Quantity</span>
              <span className="w-full max-w-[200px] text-center">Total</span>
            </p>
          </div>

          {cartItems &&
            cartItems.map((item) => (
              <CartRow key={item.productId} product={item} />
            ))}
          <div className="border-t mb-6 border-gray-300"></div>
          <div className="bg-gray-100 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
            <div className="flex items-center justify-between w-full mb-6">
              <p className="font-normal text-xl leading-8 text-gray-500">
                Sub Total
              </p>
              <h6 className="font-semibold text-xl leading-8 text-gray-900">
                ₹ {totalPrice()}
              </h6>
            </div>
            <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200">
              <p className="font-normal text-xl leading-8 text-gray-500">
                Delivery Charge
              </p>
              <h6 className="font-semibold text-xl leading-8 text-gray-900">
                ₹ 99
              </h6>
            </div>
            <div className="flex items-center justify-between w-full py-6">
              <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">
                Total
              </p>
              <h6 className="font-manrope font-medium text-2xl leading-9 text-blue-800">
                ₹ {totalPrice() + 99}
              </h6>
            </div>
          </div>
          <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
            <button className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-blue-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-blue-700">
              <Link to={"/checkout"}>
                Continue to Payment{" "}
                <ArrowForwardIosIcon className="text-sm mx-2" />
              </Link>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full flex h-[70vh] flex-col justify-center items-center max-w-7xl px-4 md:px-5 lg-6 mx-auto gap-y-10">
            <img src={emptyCartImage} alt="Empty cart" className="h-[70%]" />
            <div className="text-center">
              <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-gray-700">
                Your Cart is Empty 😔
              </h2>

              <span className="my-5 font-bold text-xl text-gray-700">
                Add Some Products, &nbsp;
                <Link
                  to="/products"
                  className="text-green-600 text-2xl underline text-center"
                >
                  Add Now
                </Link>
              </span>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
