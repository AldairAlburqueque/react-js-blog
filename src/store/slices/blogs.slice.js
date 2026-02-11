import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: null,
  reducers: {
    setBlogs: (state, action) => action.payload,
  },
});

export const { setBlogs } = blogSlice.actions;
export default blogSlice.reducer;
