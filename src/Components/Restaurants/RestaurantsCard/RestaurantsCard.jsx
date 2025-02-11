import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
  } from "@material-tailwind/react";
  import useRestaurantData from "../../Hooks/useRestaurantData";
import { Link } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useModerator from "../../Hooks/useModerator";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { motion } from "framer-motion";
import { MdOutlineAddCircleOutline } from "react-icons/md";
  const RestaurantsCard = () => {
    const [isRestaurantData , refetch] = useRestaurantData();
    const [isAdmin] = useAdmin();
    const [isModerator] = useModerator();
    const axiosSecure = useAxiosSecure();
    
    const handleDeleted = (food) => {
      if (isAdmin || isModerator) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axiosSecure.delete(`/restaurantUpload/${food}`)
              .then((res) => {
                if (res.data.deletedCount > 0) {
                  toast.success("Successfully Deleted");
                }
                refetch();
              })
              .catch((error) => {
                console.error("Error deleting:", error);
                toast.error("Failed to delete");
              });
          }
        });
      } else {
        toast.error("You are not authorized to delete");
      }
    };
    return (
      <div className="grid md:grid-cols-3 gap-4 px-8 max-w-7xl mx-auto mt-10">
        {isRestaurantData.map((restaurant) => (
          <Card
            key={restaurant.id} // Assuming each restaurant has a unique `id`
            shadow={false}
            className="relative grid h-[500px] w-full max-w-[350px] items-end justify-center overflow-hidden text-center group"
          >
            {/* Card Header with Hover Effect */}
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center transition-all duration-500 group-hover:scale-110"
              style={{
                backgroundImage: `url(${restaurant.banner})`,
              }}
            >
              <div className="absolute inset-0 h-full w-full bg-black/10 group-hover:bg-black/70 transition-all duration-500" />
            </CardHeader>
  
            {/* Card Body */}
            <CardBody className="relative py-14 px-6 md:px-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Typography
                variant="h2"
                color="white"
                className="mb-6 text-xl"
              >
              
              </Typography>
              <Typography variant="h5" className="mb-4 text-white">
                {restaurant?.restaurantName}
              </Typography>
          <div className="">
          <Link to={`/restaurantUpload/${restaurant.restaurantName}`}>
             <Avatar
                size="xl"
                variant="circular"
                alt={restaurant?.restaurantName}
                className="border-2 border-white"
                src={restaurant?.photo}
              />
             </Link>
             { (isAdmin || isModerator) && (
    <button className="">
     
      <motion.button
                     onClick={() => handleDeleted(restaurant.restaurantName)}
                      className="text-xl font-bold bg-[#ff0000d8]  text-white rounded-full shadow-lg p-6  ml-5 "
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                       <AiOutlineDelete />
                    </motion.button>
    </button>
    
  )}
          </div>
           
            </CardBody>
          </Card>
        ))}
      </div>
    );
  };
  
  export default RestaurantsCard;
  