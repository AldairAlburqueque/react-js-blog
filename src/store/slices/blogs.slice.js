import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";
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
    url = `${API_URL}/blog/list`;
  } else {
    url = `${API_URL}/blog/category/${id}`;
  }

  axiosInstance
    .get(url)
    .then((res) => dispatch(setBlogs(res.data)))
    .catch((err) => console.log(err));
};

export const getMyBlogThunk = () => (dispatch) => {
  axiosInstance
    .get(`${API_URL}/blog/me`)
    .then((res) => dispatch(setBlogs(res.data)))
    .catch((err) => console.log(err));
};

export const searchBlogThunk = (title) => (dispatch) => {
  axiosInstance
    .get(`${API_URL}/blog/search?title=${title}`)
    .then((res) => dispatch(setBlogs(res.data)))
    .catch((err) => console.log(err));
};
