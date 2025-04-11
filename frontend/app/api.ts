import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiUrl = "/choreo-apis/djangoreact/backend/v1";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
        ? import.meta.env.VITE_API_URL
        : apiUrl,
    headers: {
        "X-API-Key":
            "chk_eyJjb25uZWN0aW9uLWlkIjoiMDFmMDE2OTItODkxZS0xODM4LTk4OGMtMTEyNGNmNDNjODQwIiwia2V5IjoiMG56NGdiYWQ3cnAxZGNmMjFiMDRicjJvZTBicjlsNHdiOHBkYWFxYXhrY3JjdzQ4b2hneiJ9zHjENw",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
