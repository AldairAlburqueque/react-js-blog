import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("name");
const storedToken = localStorage.getItem("token");

const authSlice = createSlice({
  name: "authSlice",
  initialState: storedToken ? storedUser : null,
  reducers: {
    setUser: (state, action) => action.payload,
    logout: (state, action) => null,
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
