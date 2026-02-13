import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const blogSlice = createSlice({
  name: "blogs",
  initialState: null,
  reducers: {
    setBlogs: (state, action) => action.payload,
  },
});

export const { setBlogs } = blogSlice.actions;
export default blogSlice.reducer;

export const getAllBlogThunk = () => (dispatch) => {
  const url = `http://localhost:8080/blog/list`;
  axios
    .get(url)
    .then((res) => dispatch(setBlogs(res.data)))
    .catch((err) => console.log(err));
};
