import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useOwnerUser = () => {
    const axiosSecure = useAxiosSecure();
    const {data : ownerUser = [] ,  isLoading : loading , refetch} = useQuery({
        queryKey : ["ownerUser"],
        queryFn : async () => {
            const res = await axiosSecure.get("/ownerUsers")
            console.log(res.data);
            return res.data
        }
    })
    return [ownerUser , loading,refetch  ]
};

export default useOwnerUser;