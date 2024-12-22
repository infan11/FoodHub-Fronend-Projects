
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useOwnerUser from './useOwnerUser';

const userOwner = () => {
    const [ownerUser] = useOwnerUser();
    const axiosSecure = useAxiosSecure();
    const {data : isRestaurantOwner = [] } = useQuery({
       queryFn : [ownerUser?.email , "isRestaurantOwner"],
       queryKey : async () => {
        const res = await axiosSecure.get(`/ownerUsers/restaurantOwner/${ownerUser?.email}`);
        console.log( "restaurantOwner ",res.data);
        return res.data?.restaurantOwner;
       }
    })
    return [isRestaurantOwner]
};

export default userOwner;