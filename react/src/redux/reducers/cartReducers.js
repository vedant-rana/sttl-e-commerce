import { createSlice } from "@reduxjs/toolkit";
import { StringConstants } from "../../utils/stringConstants";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem(StringConstants.CART_ITEMS)) || [],
  loading: true,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId, quantity } = action.payload;

      const item = state.cartItems.find((item) => item.productId === productId);
      console.log(item);
      if (item) {
        if (item.quantity > 9) {
          return;
        }
        item.quantity = item.quantity + quantity;
        localStorage.setItem(
          StringConstants.CART_ITEMS,
          JSON.stringify(state.cartItems)
        );
        return;
      } else {
        state.cartItems.push(action.payload);
        localStorage.setItem(
          StringConstants.CART_ITEMS,
          JSON.stringify(state.cartItems)
        );
      }
    },
    updateItemQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.productId === productId);
      if (item) {
        item.quantity = quantity;
        localStorage.setItem(
          StringConstants.CART_ITEMS,
          JSON.stringify(state.cartItems)
        );
      }
    },
    removeItemFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      localStorage.setItem(
        StringConstants.CART_ITEMS,
        JSON.stringify(state.cartItems)
      );
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.removeItem(StringConstants.CART_ITEMS);
    },
    setCartItems(state, action) {
      state.cartItems = action.payload;
      localStorage.setItem(
        StringConstants.CART_ITEMS,
        JSON.stringify(state.cartItems)
      );
    },

    setCartFromLocalStorage(state) {
      state.cartItems =
        JSON.parse(localStorage.getItem(StringConstants.CART_ITEMS)) || [];
      // localStorage.setItem(
      //   StringConstants.CART_ITEMS,
      //   JSON.stringify(state.cartItems)
      // );
    },
  },
});

export const {
  addToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
  setCartItems,
  setCartFromLocalStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
