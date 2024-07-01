import { createSlice } from "@reduxjs/toolkit";
import { StringConstants } from "../../utils/stringConstants";

//initial state of cart slice
const initialState = {
  //cart items stores items of cart in state
  cartItems: JSON.parse(localStorage.getItem(StringConstants.CART_ITEMS)) || [],
  loading: true,
  error: null,
};

// cart slice which has reducers
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // reducer to handle add to cart
    addToCart(state, action) {
      const { productId, quantity } = action.payload;

      //finding whether product is already in cart or not
      const item = state.cartItems.find((item) => item.productId === productId);

      // if item exist then increase its quantity
      if (item) {
        // max quantity will be 10
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
        // adding product to cart items array because its not  available
        state.cartItems.push(action.payload);
        localStorage.setItem(
          StringConstants.CART_ITEMS,
          JSON.stringify(state.cartItems)
        );
      }
    },

    // reducer to handle update item quantity
    updateItemQuantity(state, action) {
      const { productId, quantity } = action.payload;

      //getting product object from cart
      const item = state.cartItems.find((item) => item.productId === productId);

      // if item exist then update its quantity
      if (item) {
        item.quantity = quantity;
        localStorage.setItem(
          StringConstants.CART_ITEMS,
          JSON.stringify(state.cartItems)
        );
      }
    },
    // reducer to handle remove item from cart
    removeItemFromCart(state, action) {
      // removeing product with id from cart using filter
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      localStorage.setItem(
        StringConstants.CART_ITEMS,
        JSON.stringify(state.cartItems)
      );
    },

    // reducer to handle clear cart
    clearCart(state) {
      state.cartItems = [];
      localStorage.removeItem(StringConstants.CART_ITEMS);
    },

    // reducer to set cart items using action payload
    setCartItems(state, action) {
      state.cartItems = action.payload;
      localStorage.setItem(
        StringConstants.CART_ITEMS,
        JSON.stringify(state.cartItems)
      );
    },
  },
});

// exporting all reducers
export const {
  addToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
  setCartItems,
  setCartFromLocalStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
