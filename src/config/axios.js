import axios from "axios";
import * as localStorage from "../services/localStorage";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getToken();

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // localStorage.removeToken();
      //should have better solution when get 401 then return to login page
      // window.location.replace(`${process.env.NEXT_PUBLIC_HOST}/login`);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
