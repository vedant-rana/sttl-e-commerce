import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartRow from "../components/CartRow";
import {
  setCartFromLocalStorage,
  setCartItems,
} from "../redux/reducers/cartReducers";
import { syncCartData } from "../services/cartServices";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cartData);
  const { user } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  console.log(cartItems);

  useEffect(() => {
    // dispatch(setCartFromLocalStorage());
    const syncCart = async () => {
      if (user) {
        const response = await syncCartData(cartItems);
        console.log(response.data.items);
        dispatch(setCartItems(response.data.items));
      }
    };

    syncCart();
  }, [dispatch]);

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
