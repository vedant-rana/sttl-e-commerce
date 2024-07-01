import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/reducers/productReducer";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.productData);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return (
    <div className="flex w-full h-[100vh] justify-center">
      <div className="bg-white flex relative z-8 items-center overflow-hidden">
        <div className="container mx-auto px-6 flex relative py-16 justify-center gap-x-8">
          <div className="sm:w-2/3 lg:w-2/5 flex flex-col justify-center relative z-20">
            <span className="w-20 h-2 bg-gray-800 mb-12"></span>
            <h1 className="font-bebas-neue uppercase text-8xl font-black flex flex-col leading-none  text-gray-800">
              WP VANTAGE
              <span className="text-5xl text-yellow-600 my-5">
                Welcomes You
              </span>
            </h1>
            <p className="text-sm sm:text-base text-gray-700 ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
              quasi dolorem quos facere, asperiores, commodi possimus blanditiis
              sequi necessitatibus, fugit quisquam? Reiciendis, deleniti
              recusandae nam voluptatum beatae placeat soluta saepe.
              Perspiciatis nostrum voluptas cum soluta.
            </p>
            <div className="flex mt-8">
              <Link
                to="/products"
                className="uppercase py-2 px-4 rounded-lg bg-[#de4935] border-2 border-transparent text-white text-md mr-4 hover:bg-[#ff715f]"
              >
                Go Shopping
              </Link>
              <Link
                to="/contact"
                className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-[#de4935] text-[#de4935]  hover:bg-[#de4935] hover:text-white text-md"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden sm:block sm:w-1/3 lg:w-2/5 relative">
            <img
              // src="https://www.tailwind-kit.com/images/object/10.png"
              src="https://img.freepik.com/free-vector/application-smartphone-mobile-computer-payments-online-transaction-shopping-online-process-smartphone-vecter-cartoon-illustration-isometric-design_1150-62441.jpg?t=st=1719464094~exp=1719467694~hmac=408c82c80139ef91d0427e2d722678a2833b80e6bc684b4a307f2b894c883a45&w=740"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
