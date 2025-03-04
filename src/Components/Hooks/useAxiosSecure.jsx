import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useAxiosSecure = () => {
    const { logout } = useAuth();

    const navigate = useNavigate();
    const axiosSecure = axios.create({
        baseURL: "https://foodhub-backend.vercel.app"
    })

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem("jwt-token");
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        return Promise.reject(error)
    })

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        console.log("response error ", status);
        if (status === 401 || status === 403) {
            // await  logout()
            // navigate("/login")
        }
        return Promise.reject(error);
    })
    return axiosSecure;
};


export default useAxiosSecure;