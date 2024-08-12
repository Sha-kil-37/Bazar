import { createSlice } from "@reduxjs/toolkit";
//
const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartList: [],
  },
  //
  reducers: {
    setCartList: (state, action) => {
      state.cartList.push(action.payload);
    },
    removeCartList: (state, action) => {
      state.cartList = state.cartList.filter(
        (element) => element !== action.payload
      );
      console.log("done");
      
    },
  },
});
// Action creators are generated for each case reducer function
export const { setCartList, removeCartList } = cartSlice.actions;
export default cartSlice.reducer;
