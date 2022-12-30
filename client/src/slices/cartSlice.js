import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: paymentMethodFromStorage,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ id, qty }) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      const newItem = {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: qty,
      };
      return newItem;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.product !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress)
      );
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem(
        "paymentMethod",
        JSON.stringify(state.paymentMethod)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        const item = action.payload;
        const existItem = state.cartItems.find(
          (cartItem) => cartItem.product === item.product
        );
        if (existItem) {
          state.cartItems = state.cartItems.map((cartItem) =>
            cartItem.product === existItem.product ? item : cartItem
          );
        } else {
          state.cartItems = [...state.cartItems, item];
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = cartSlice;
export const { removeFromCart, saveShippingAddress, savePaymentMethod } =
  actions;
export default reducer;
