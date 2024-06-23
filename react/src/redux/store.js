import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";
import cartReducers from "./reducers/cartReducers";

const store = configureStore({
  reducer: {
    userData: userReducer,
    productData: productReducer,
    cartData: cartReducers,
  },
});

export default store;
