import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { syncCartData } from "../services/cartServices";
import { setCartItems } from "../redux/reducers/cartReducers";
import { StringConstants } from "../utils/stringConstants";

/**
 * @purpose to sync local cart data to logged in users db
 * @param user
 */
const useSyncCart = (user) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartData);

  useEffect(() => {
    const syncCart = async () => {
      if (user) {
        const response = await syncCartData(cartItems);
        console.log(response.data.items);
        localStorage.removeItem(StringConstants.CART_ITEMS);
        localStorage.setItem(
          StringConstants.CART_ITEMS,
          JSON.stringify(response.data.items)
        );
      }
    };

    syncCart();
  }, [user, dispatch, cartItems]);
};

export default useSyncCart;
