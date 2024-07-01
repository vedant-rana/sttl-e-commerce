import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";
import cartReducers from "./reducers/cartReducers";

// creating redux store for state management
const store = configureStore({
  // reducers of store
  reducer: {
    userData: userReducer,
    productData: productReducer,
    cartData: cartReducers,
  },
});

export default store;
