import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("name") || null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  role: localStorage.getItem("idUser") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.idUser = action.payload.idUser;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.idUser = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
