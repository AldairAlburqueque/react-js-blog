// api/axiosConfig.js
import axios from "axios";
import { API_URL } from "./url";
import { logout } from "../store/slices/auth.slice";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

let isRedirecting = false;
let isInterceptorSet = false;

export const setupAxiosInterceptors = (store) => {
  if (isInterceptorSet) return;

  isInterceptorSet = true;

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        (error.response?.status === 401 || error.response?.status === 403) &&
        !isRedirecting
      ) {
        isRedirecting = true;

        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("role");
        localStorage.removeItem("idUser");

        store.dispatch(logout());

        Swal.fire({
          icon: "error",
          title: "Sesión expirada",
          text: "Tu sesión ha caducado. Por favor inicia sesión nuevamente.",
          confirmButtonColor: "#f59e0b",
          background: "#18181b",
          color: "#e4e4e7",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(() => {
          window.location.replace("/auth/login");
        });
      }

      return Promise.reject(error);
    },
  );
};

export default axiosInstance;
