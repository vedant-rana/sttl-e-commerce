import React from "react";
import { useSelector } from "react-redux";
import CartRow from "../components/CartRow";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cartData);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems &&
            cartItems.map((item) => (
              <CartRow key={item.productId} product={item} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
