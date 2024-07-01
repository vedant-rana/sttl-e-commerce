import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProductsServices } from "../../services/productServices";

// creating action to get all products
export const getAllProducts = createAsyncThunk(
  "products/allProducts",
  async () => {
    try {
      return await getAllProductsServices();
    } catch (e) {
      return [];
    }
  }
);

// inital state of products
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// products slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
