import axios from "axios";

const api =axios.create(
    {
        baseURL:import.meta.env.VITE_BACKEND_API_URL,
    }
)
// Automatically inject the JWT token into every request header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwt_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;


