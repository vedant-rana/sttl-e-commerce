import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../redux/reducers/productReducer";

const Products = () => {
  // getting all products from the store
  const { products } = useSelector((state) => state.productData);
  const dispatch = useDispatch();

  useEffect(() => {
    // loading all the products from backend to state using reducer
    // dispatch(getAllProducts());
  }, []);

  return (
    <>
      <h1 className="text-4xl text-center mt-10 mb-5 font-bold">Products</h1>
      <div className="w-full flex justify-center mb-10">
        <div
          className="w-full max-w-screen-2xl flex flex-wrap "
          style={{ gap: "0 5%" }}
        >
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
