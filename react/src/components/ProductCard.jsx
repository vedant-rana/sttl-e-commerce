import React from "react";
import { imageServer } from "../utils/envVariables";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducers";
import { Link } from "react-router-dom";
import { useAlert } from "./AlertProvider";
import { syncCartData } from "../services/cartServices";

const ProductCard = ({ product }) => {
  const { _id, name, image, price } = product;
  const { user } = useSelector((state) => state.userData);
  const showAlert = useAlert();

  // server url
  const server = imageServer;

  const dispatch = useDispatch();

  // function to add product to cart on add to cart button click
  const addProductToCart = (id) => {
    // creating cart item for cart
    const newProduct = { productId: id, name, image, price, quantity: 1 };

    // checking if user has already logged in
    if (user) {
      // if user logged in then add product user cart in db
      syncCartData(newProduct).then((res) => {
        if (res.data) {
          // handling add to cart for store
          dispatch(addToCart(newProduct));
          showAlert("Product added to cart", "success");
        }
      });
    } else {
      dispatch(addToCart(newProduct));
      showAlert("Product added to cart", "success");
    }
  };

  return (
    <div className="relative my-8 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md hover:shadow-2xl transition-all">
      <Link
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl items-center justify-center"
        to={`/products/${_id}`}
      >
        <img
          className="object-contain w-full h-full"
          src={`${server}${image}`}
          alt="product image"
        />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          20% OFF
        </span>
      </Link>

      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl tracking-tight text-slate-900 capitalize">
            {name}
          </h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">₹ {price}</span>
            <span className="text-sm ml-2 text-slate-900 line-through">
              ₹ {Math.round(price + price * 0.2)}
            </span>
          </p>
        </div>
        <button
          className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={() => addProductToCart(_id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
