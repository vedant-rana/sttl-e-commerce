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
    <div className="w-full h-[90vh] flex flex-col justify-center max-w-7xl px-4 md:px-5 lg-6 mx-auto">
      <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
        Welcome To &nbsp; <span className="text-blue-800">WPWANTAGE</span>
      </h2>
      <h2 className="title font-manrope font-bold text-2xl leading-10 mb-8 text-center text-black">
        To explore Products{" "}
        <Link to="/products" className="text-purple-600">
          Click Here
        </Link>
      </h2>
    </div>
  );
};

export default Home;
