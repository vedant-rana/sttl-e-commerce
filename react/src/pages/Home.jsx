import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/reducers/productReducer";

const Home = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.productData);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return <div>Home</div>;
};

export default Home;
