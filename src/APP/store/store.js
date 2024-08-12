import { configureStore } from "@reduxjs/toolkit";
import category from "../slice/categorySlice";
import product from "../slice/productSlice";
import cart from "../slice/cartSlice";
import user from "../slice/userSlice";
//
export default configureStore({
  reducer: {
    product: product,
    category: category,
    cart: cart,
    user: user,
  },
});
