import { configureStore } from "@reduxjs/toolkit";
import blogs from "./slices/blogs.slice";

export default configureStore({
  reducer: {
    blogs,
  },
});
