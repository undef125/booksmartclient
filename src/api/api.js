import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "https://web-production-59b7.up.railway.app/",
    baseURL: "https://booksmart-97gk.onrender.com/",
    // baseURL: "http://localhost:5000",
    },
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
