import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useModerator  = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {data : isModerator = [] } = useQuery({
        queryKey : [user?.email , 'isModerator'],
        queryFn : async () => {
            const res = await axiosSecure.get(`/users/moderator/${user?.email}`)
            console.log( "moderator",res.data);
            return res.data?.moderator;
        }
    })
    return [isModerator]
};

export default useModerator ;