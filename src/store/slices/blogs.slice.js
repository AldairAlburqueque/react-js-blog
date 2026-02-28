import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../utils/getConfig";
import { API_URL } from "../../utils/url";

const blogSlice = createSlice({
  name: "blogs",
  initialState: null,
  reducers: {
    setBlogs: (state, action) => action.payload,
  },
});

export const { setBlogs } = blogSlice.actions;
export default blogSlice.reducer;

export const getAllBlogThunk = (id) => (dispatch) => {
  let url;

  if (!id) {
    url = `http://localhost:8080/blog/list`;
  } else {
    url = `http://localhost:8080/blog/category/${id}`;
  }
  axios
    .get(url, config())
    .then((res) => dispatch(setBlogs(res.data)))
    .catch((err) => console.log(err));
};

export const getMyBlogThunk = () => (dispatch) => {
  const url = `${API_URL}/blog/me`;
  axios
    .get(url, config())
    .then((res) => dispatch(setBlogs(res.data)))
    .catch((err) => console.log(err));
};
