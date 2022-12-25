import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
const initialState = {
  products: [],
  errorMessage: "",
  productsStatus: "idle",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const res = await axios.get("/api/products");
      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsStatus = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsStatus = "idle";
        state.products = action.payload ? action.payload : [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.productsStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { reducer } = productsSlice;
export default reducer;
