import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeItemFromCart,
  updateItemQuantity,
} from "../redux/reducers/cartReducers";
import {
  manageQuantityService,
  removeItemService,
} from "../services/cartServices";
import { imageServer } from "../utils/envVariables";
import { useAlert } from "./AlertProvider";
import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";

const CartRow = ({ product }) => {
  const { productId, name, image, price, quantity } = product;

  const showAlert = useAlert();
  const { user } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  // quant state to handle to store quantity change
  const [quant, setQuant] = useState(quantity);

  // common function to manage change in quantity
  const manageQuantityChange = (changeValue) => {
    // if user logged in then update quantity in db
    if (user) {
      manageQuantityService({ productId, quantity: quant + changeValue }).then(
        (res) => {
          // if quantity updated successfully then dispatch action to update quantity in store
          if (res.data) {
            dispatch(
              updateItemQuantity({ productId, quantity: quant + changeValue })
            );
            // if quantity updated successfully then update state variable quant
            setQuant(quant + changeValue);
          }
        }
      );
    } else {
      // if user not logged in then dispatch action to update quantity only in store
      dispatch(
        updateItemQuantity({ productId, quantity: quant + changeValue })
      );
      setQuant(quant + changeValue);
    }
  };

  // function to increment the quantity by 1
  const handleIncrement = () => {
    if (quant < 10) {
      manageQuantityChange(1);
    }
  };

  // function to decrement the quantity by 1
  const handleDecrement = () => {
    if (quant > 1) {
      manageQuantityChange(-1);
    }
  };

  // function to remove product from cart
  const removeFromCart = (productId) => {
    if (user) {
      // if user is not logged in then remove from cart in db
      removeItemService(productId).then((res) => {
        if (res.data) {
          // after success remove product form store
          dispatch(removeItemFromCart(productId));
          showAlert("Product removed from cart", "success");
        }
      });
    } else {
      dispatch(removeItemFromCart(productId));
      showAlert("Product removed from cart", "success");
    }
  };

  return (
    <div className="grid grid-cols-1 min-h-[180px] lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-300 py-6">
      <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
        <div className="img-box">
          <img
            src={`${imageServer + image}`}
            alt="perfume bottle image"
            className="xl:w-[110px]"
          />
        </div>
        <div className="pro-data w-full max-w-sm">
          <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
            <Link to={`/products/${productId}`}>{name}</Link>
          </h5>
          <p className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center"></p>
          <h6 className="font-medium text-lg leading-8 text-blue-700 max-[550px]:text-center">
            ₹ {price}
          </h6>
        </div>
      </div>
      <div className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
        <div className="flex items-center w-full mx-auto justify-center">
          <button
            className="group rounded-l-full px-4 py-[8px] border border-gray-400 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
            onClick={handleDecrement}
          >
            <Remove />
          </button>
          <span className="border-y border-gray-400 outline-none text-gray-900 font-semibold text-lg w-full max-w-[50px] min-w-[80px] placeholder:text-gray-900 py-[6px] text-center bg-transparent">
            {quant}
          </span>
          <button
            className="group rounded-r-full px-4 py-[8px] border border-gray-400 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
            onClick={handleIncrement}
          >
            <Add />
          </button>
          <button
            className="group ml-4 px-5 py-[8px] border border-red-400 text-red-600 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 rounded-full hover:shadow-red-200 hover:border-red-300 hover:bg-red-50 "
            onClick={() => removeFromCart(productId)}
          >
            <DeleteForeverIcon />
          </button>
        </div>
        <h6 className="text-blue-700 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
          ₹ {price * quant}
        </h6>
      </div>
    </div>
  );
};

export default CartRow;
