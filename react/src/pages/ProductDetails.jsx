import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "../components/AlertProvider";
import { addToCart } from "../redux/reducers/cartReducers";
import { syncCartData } from "../services/cartServices";
import { getSingleProductService } from "../services/productServices";
import { imageServer } from "../utils/envVariables";

const ProductDetails = () => {
  // getting id of product from params
  const { id } = useParams();
  const dispatch = useDispatch();
  const showAlert = useAlert();

  // getting user details from state
  const { user } = useSelector((state) => state.userData);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // getting product details from db on page loading
    getSingleProductService(id).then((data) => {
      setProduct(data);
    });
  }, [id]);

  const handleIncrement = () => {
    // handling max quantity to 10
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    // quantity should not be less than 1
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // handling add to cart products
  const addProductToCart = () => {
    const newProduct = {
      productId: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: quantity,
    };

    if (user) {
      // adding product to cart in db
      syncCartData(newProduct).then((res) => {
        // if cart product added in backend then update the local state
        if (res.data) {
          dispatch(addToCart(newProduct));
          showAlert("Product added to cart", "success");
        }
      });
    } else {
      // user is not logged in then add product local cart
      dispatch(addToCart(newProduct));
      showAlert("Product added to cart", "success");
    }
  };

  return (
    <div className="font-sans bg-white mt-10">
      {product && (
        <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto ">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 border shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6 rounded-lg">
            <div className="lg:col-span-3 w-full lg:sticky top-0 text-center ">
              <div className="px-4 py-10 border rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                <img
                  src={`${imageServer}${product.image}`}
                  alt="Product"
                  className="w-1/2 rounded object-cover mx-auto"
                />
                <button type="button" className="absolute top-4 right-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    fill="#ccc"
                    className="mr-1 hover:fill-[#333]"
                    viewBox="0 0 64 64"
                  >
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-gray-800">
                {product.name} | {product.category}
              </h2>

              <div className="flex space-x-2 mt-4">
                <svg
                  className="w-5 fill-blue-600"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg
                  className="w-5 fill-blue-600"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg
                  className="w-5 fill-blue-600"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg
                  className="w-5 fill-blue-600"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg
                  className="w-5 fill-[#CED5D8]"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <h4 className="text-gray-800 text-base">500 Reviews</h4>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <p className="text-gray-800 text-3xl font-bold">
                  ₹{product.price}
                </p>
                <p className="text-gray-400 text-base">
                  {/* <strike>$1500</strike>{" "} */}
                  <span className="text-sm ml-1">Tax included</span>
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800">
                  Choose a Color
                </h3>
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    type="button"
                    className="w-10 h-10 bg-black border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all"
                  ></button>
                  <button
                    type="button"
                    className="w-10 h-10 bg-gray-300 border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all"
                  ></button>
                  <button
                    type="button"
                    className="w-10 h-10 bg-gray-100 border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all"
                  ></button>
                  <button
                    type="button"
                    className="w-10 h-10 bg-blue-400 border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all"
                  ></button>
                </div>
              </div>

              <div className="flex mt-6 sm:items-center sm:justify-start w-full">
                <button
                  className="group py-2 px-4 border border-gray-400 rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
                  onClick={handleDecrement}
                >
                  <RemoveIcon />
                </button>
                <input
                  type="text"
                  className="font-semibold text-gray-900 cursor-pointer text-lg py-[7px] px-4 w-full sm:max-w-[70px] outline-0 border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50"
                  placeholder="1"
                  value={quantity}
                  readOnly
                />
                <button
                  className="group py-2 px-4 border border-gray-400 rounded-r-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
                  onClick={handleIncrement}
                >
                  <AddIcon />
                </button>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  type="button"
                  className="min-w-[200px] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded"
                >
                  Buy now
                </button>
                <button
                  type="button"
                  className="min-w-[200px] px-4 py-2.5 border border-blue-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
                  onClick={addProductToCart}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
            <h3 className="text-xl font-bold text-gray-800">
              Product information
            </h3>
            <ul className="mt-4 space-y-6 text-gray-800">
              <li className="text-sm">
                PRODUCT <span className="ml-4 float-right">{product.name}</span>
              </li>
              <li className="text-sm">
                CATEGORY{" "}
                <span className="ml-4 float-right">{product.category}</span>
              </li>
              <li className="text-sm">
                PRICE <span className="ml-4 float-right">{product.price}</span>
              </li>
              <li className="text-sm">
                DESCRIPTION
                <span className="ml-4 float-right">{product.description}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
