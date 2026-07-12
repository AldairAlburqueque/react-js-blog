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

  axiosInstance.interceptors.request.use((config) => {
    if (
      config.url.includes("/auth/login") ||
      config.url.includes("/auth/save")
    ) {
      return config;
    }

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const url = error.config?.url || "";

      // Ignorar errores del login y registro
      if (url.includes("/auth/login") || url.includes("/auth/save")) {
        return Promise.reject(error);
      }

      if (
        (error.response?.status === 401 || error.response?.status === 403) &&
        !isRedirecting
      ) {
        isRedirecting = true;

        store.dispatch(logout());

        Swal.fire({
          icon: "warning",
          title: "Sesión expirada",
          text: "Tu sesión ha expirado. Inicia sesión nuevamente.",
          confirmButtonColor: "#f59e0b",
          background: "#18181b",
          color: "#e4e4e7",
        }).then(() => {
          window.location.replace("/auth/login");
        });
      }

      return Promise.reject(error);
    },
  );
};

export default axiosInstance;
