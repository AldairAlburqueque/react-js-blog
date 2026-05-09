// api/axiosConfig.js
import axios from "axios";
import { API_URL } from "./url";
import { logout } from "../store/slices/auth.slice";

const axiosInstance = axios.create({
  baseURL: API_URL,
});
let isInterceptorSet = false;
// No importamos store aquí, solo exportamos la instancia y una función de configuración

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

        alert("Tu sesión ha caducado. Por favor inicia sesión nuevamente.");

        window.location.replace("/auth/login");
      }

      return Promise.reject(error);
    },
  );
};

export default axiosInstance;
