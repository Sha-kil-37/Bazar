import { createSlice } from "@reduxjs/toolkit";
// 
export const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
  },
  //
  reducers: {
    setProduct: (state, action) => {
      state.productList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
