import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useRestaurantData from "../../Hooks/useRestaurantData";
import { useParams } from "react-router-dom";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { motion } from "framer-motion";
import { Circles } from "react-loader-spinner";

const DetailsRestaurants = () => {
  const [, refetch] = useRestaurantData();
  const { restaurantName } = useParams();
  const [foodItems, setFoodItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/restaurantUpload/${restaurantName}`)
      .then((res) => {
        setFoodItems(res.data?.foods || []);
        console.log(res.data.foods);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [restaurantName, axiosSecure]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold">
       <Circles
                    height="80"
                    width="80"
                    color="#ff0000d8"
                    ariaLabel="circles-loading"
                    visible={true}
                />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 px-4">
        {foodItems.length > 0 ? (
          foodItems.map((food, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative flex flex-col bg-white shadow-md border border-gray-200 rounded-lg w-[400px] h-[450px] mx-auto px-4 py-4">
                {/* Food Image */}
                <div className="relative h-56 overflow-hidden rounded-md">
                  <motion.img
                    src={food.foodImage}
                    alt={food.foodName}
                    className="h-[240px] w-full object-cover"
                    whileHover={{ scale: 1.1 }}
                  />
                </div>

                {/* Food Details */}
                <div className="p-4">
                  <div className="mb-2 bg-cyan-600 text-white text-xs py-1 px-3 rounded-full w-fit">
                    {food.category || "POPULAR"}
                  </div>
                  <p className="mb-2 bg-red-600 text-white text-xs py-1 px-3 rounded-full w-fit">
                    {food.foodName || "Unavailable"}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-red-500 text-sm">
                      Delicious {food.foodName} from <br /> {restaurantName}. Price: ${food.price}
                    </p>
                    {/* Add Button */}
                    <motion.button
                      className="text-xl font-bold bg-red-600 text-white rounded-full shadow-lg p-3"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <MdOutlineAddCircleOutline />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex justify-center items-center min-h-screen mx-auto w-full">
          <motion.p
            className="bg-white p-10 font-extrabold border-l-4 border-red-500 text-red-500 drop-shadow-2xl rounded-xl text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            whileHover={{ scale: 1.1 }}
          >
            No food items available for this restaurant. 🍽️
          </motion.p>
        </div>
        )} 
      </div>
    </div>
  );
};

export default DetailsRestaurants;
