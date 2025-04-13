
import axios from "axios";

import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const axiosSecure  = axios.create({
    baseURL: "https://foodhub-backend.vercel.app"
})
const useAxiosSecure = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate()
 
 axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem("jwt-token")
        // console.log("request stopped by interceptors" , token);
        config.headers.authorization = `Bearar ${token}`
        return config
    } , function (error) {
        // Do something with request error
        return Promise.reject(error);
      })
      //  reaponse interceptors
      axiosSecure.interceptors.response.use(
        function (response) {
          return response; // handle success
        },
        async (error) => {
          const status = error?.response?.status;
          console.log("status error in the interceptors", status);
      
          if (status === 401 || status === 403) {
            await logOut(); // handle unauthorized/forbidden errors
            navigate("/login");
          }
      
          return Promise.reject(error); // always reject error
        }
      );
      
      return axiosSecure
};

export default useAxiosSecure;
