import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {data : isAdmin } = useQuery({
        queryKey : [user?.email , 'isAdmin'],
        queryFn : async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`)
            console.log( "admin true",res.data);
            return res.data
        }
    })
    return [isAdmin]
};

export default useAdmin;