import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store";
import { doUpdateToken } from "../redux/action/updateToken";

const instance = axios.create({
    baseURL: "http://localhost:8017/",
    withCredentials: true,
});

const excludedUrls = ["/auth/login", "/auth/register", "/auth/refresh-token"];
let isRefreshing = false;
let refreshSubscribers = [];

const refreshToken = async () => {
    try {
        const refreshToken = store.getState()?.account?.account?.refreshToken;
        
        if (!refreshToken) {
            console.warn("No refresh token available.");
            return null;
        }

        const response = await axios.post("http://localhost:8080/freeclassroom/auth/refresh-token", {
            refreshToken,
        }, { withCredentials: true });

        if (response.status !== 200 || !response.data?.result?.accessToken) {
            console.warn("Failed to refresh token.");
            return null;
        }


        // Cập nhật token mới vào Redux store
        store.dispatch(doUpdateToken(response.data.result));

        return response.data.result.accessToken;
    } catch (error) {
        console.error("Refresh token failed", error);
        return null;
    }
};


instance.interceptors.request.use(
    (config) => {
        const accessToken = store.getState()?.account?.account?.accessToken;
        const shouldAttachToken = !excludedUrls.some((url) => config.url.includes(url));

        if (shouldAttachToken && accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }


        NProgress.start();
        return config;
    },
    (error) => Promise.reject(error)
);


instance.interceptors.response.use(
    (response) => {
        NProgress.done();
        return response?.data;
    },
    async (error) => {
        NProgress.done();

        const { response, config } = error;
        const status = response?.status;


        if (status === 401 || status === 403) {
            if (!isRefreshing) {
                isRefreshing = true;

                const newToken = await refreshToken();
                isRefreshing = false;

                if (newToken) {
                    refreshSubscribers.forEach((callback) => callback(newToken));
                    refreshSubscribers = [];
                } else {
                    refreshSubscribers.forEach((cb) => cb(null));
                    refreshSubscribers = [];
                    return Promise.reject(error);
                }
            }

            return new Promise((resolve, reject) => {
                refreshSubscribers.push((token) => {
                    if (token) {
                        config.headers["Authorization"] = `Bearer ${token}`;
                        resolve(instance(config));
                    } else {
                        reject(error);
                    }
                });
            });
        }

        return error;
    }
);

export default instance;
