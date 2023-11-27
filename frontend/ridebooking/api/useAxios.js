import axiosInstancePrivate, { baseURL } from "./AxiosSettings";
import useGetContext from "../context/useGetContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const useAxios = () => {
    const { setUserToken, userToken, setErrorAPI } = useGetContext()
    const navigate = useNavigate()
    axiosInstancePrivate.interceptors.request.use(
        (config) => {
            const accessToken = JSON.parse(localStorage.getItem("access_token"));
            if (accessToken) {
                config.headers.Authorization = `JWT ${accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Add a response interceptor
    axiosInstancePrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // If the error status is 401 and there is no originalRequest._retry flag,
            // it means the token has expired and we need to refresh it
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const refreshToken = JSON.parse(localStorage.getItem("refresh_token")) || ""
                    const response = await axios.post(`${baseURL}api/token/refresh/`, { refresh:refreshToken });

                    const responseAccessToken = response?.data?.access
                    const responseRefreshToken = response?.data?.refresh

                    localStorage.setItem('access_token', JSON.stringify(responseAccessToken));
                    localStorage.setItem('refresh_token', JSON.stringify(responseRefreshToken));
                    setUserToken({
                        ...userToken,
                        access: responseAccessToken,
                        refresh: responseRefreshToken
                    })
                    // Retry the original request with the new token
                    originalRequest.headers.Authorization = `JWT ${response?.data?.access}`;
                    return axios(originalRequest);
                } catch (error) {
                    setErrorAPI("Authentication failed, you will be redirected to login");
                    localStorage.clear()
                    setUserToken({
                        ...userToken,
                        access:"",
                        refresh:"",
                    })
                    navigate("/login")
                    // Handle refresh token error or redirect to login
                }
            }

            return Promise.reject(error);
        }
    );




    return axiosInstancePrivate;
}


export default useAxios;


