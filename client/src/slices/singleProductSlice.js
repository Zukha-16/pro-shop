import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  singleProduct: {},
  errorMessage: "",
  singleProductStatus: "idle",
};

export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetchProduct",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.singleProductStatus = "loading";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProductStatus = "idle";
        state.singleProduct = action.payload ? action.payload : {};
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.singleProductStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { reducer } = singleProductSlice;
export default reducer;
