import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
  errorMessage: "",
  ordersStatus: "idle",
};

export const createOrder = createAsyncThunk(
  "orders/createorder",
  async (order, { getState }) => {
    try {
      const { data } = await axios.post("/api/orders", order, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().user.user.token}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "orders/fetchorders",
  async (_, { getState }) => {
    try {
      const { data } = await axios.get("/api/orders", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().user.user.token}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrderStatus: (state) => {
      state.ordersStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.ordersStatus = "loading";
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.ordersStatus = "succeeded";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.ordersStatus = "failed";
        state.errorMessage = action.error.message;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.ordersStatus = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.ordersStatus = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.ordersStatus = "failed";
        state.errorMessage = action.error.message;
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = ordersSlice;
export const { resetOrderStatus } = actions;
export default reducer;
