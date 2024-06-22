import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../redux/reducers/productReducer";

const Products = () => {
  const { products } = useSelector((state) => state.productData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return (
    <>
      <div className="w-full flex justify-center">
        <div
          className="w-full max-w-screen-2xl flex flex-wrap "
          style={{ gap: "5%" }}
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
