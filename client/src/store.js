import { configureStore } from "@reduxjs/toolkit";
import products from "./slices/productsSlice";
import singleProduct from "./slices/singleProductSlice";
import cart from "./slices/cartSlice";
import user from "./slices/userSlice";
import userDetails from "./slices/userDetailsSlice";
import orders from "./slices/orderSlice";

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = configureStore({
  reducer: {
    products,
    singleProduct,
    cart,
    user,
    userDetails,
    orders,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
