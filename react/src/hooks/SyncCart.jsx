import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { syncCartData } from "../services/cartServices";
import { setCartItems } from "../redux/reducers/cartReducers";
import { StringConstants } from "../utils/stringConstants";

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
        // dispatch(setCartItems(response.data.items));
      }
    };

    syncCart();
  }, [user, dispatch, cartItems]);
};

export default useSyncCart;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { syncCartData } from "../services/cartServices";
// import { setCartItems } from "../redux/reducers/cartReducers";

// const useSyncCart = (user) => {
//   const dispatch = useDispatch();
//   const { cartItems } = useSelector((state) => state.cartData);
//   const [isSynced, setIsSynced] = useState(false);

//   useEffect(() => {
//     const syncCart = async () => {
//       if (user && !isSynced) {
//         try {
//           const response = await syncCartData(cartItems);
//           dispatch(setCartItems(response.data.items)); // Ensure this matches the structure of your response
//           console.log(response.data.items);
//           setIsSynced(true);
//         } catch (error) {
//           console.error("Error syncing cart data:", error);
//         }
//       }
//     };

//     syncCart();
//   }, [user, isSynced, dispatch]); // Remove cartItems from dependencies to prevent loop
// };

// export default useSyncCart;
