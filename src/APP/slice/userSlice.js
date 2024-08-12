import { createSlice } from "@reduxjs/toolkit";
//
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export default userSlice.reducer;
export const { setUser } = userSlice.actions;
