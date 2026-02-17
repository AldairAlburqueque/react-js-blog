import { configureStore } from "@reduxjs/toolkit";
import blogs from "./slices/blogs.slice";
import auth from "./slices/auth.slice";

export default configureStore({
  reducer: {
    blogs,
    auth,
  },
});
