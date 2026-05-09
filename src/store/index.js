import { configureStore } from "@reduxjs/toolkit";
import blogs from "./slices/blogs.slice";
import auth from "./slices/auth.slice";
import { setupAxiosInterceptors } from "../utils/axiosConfig";

// export default configureStore({
//   reducer: {
//     blogs,
//     auth,
//   },
// });

const store = configureStore({
  reducer: {
    blogs,
    auth,
  },
});

// Configurar interceptores UNA VEZ que el store existe
setupAxiosInterceptors(store);

export default store;
