import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useRestaurantData from "../../Hooks/useRestaurantData";
import { useParams } from "react-router-dom";
import { MdOutlineAddCircleOutline } from "react-icons/md";

const DetailsRestaurants = () => {
  const [, refetch] = useRestaurantData();
  const { restaurantName } = useParams();
  const [foodItems, setFoodItems] = useState([]);
  const axiosSecure = useAxiosSecure();
  

  useEffect(() => {
    axiosSecure
      .get(`/restaurantUpload/${restaurantName}`)
      .then((res) => {
        setFoodItems(res.data.foods); // Assuming `foods` contains the array of food items
        console.log(res.data.foods);
      })
      .catch((err) => console.error(err));
  }, [restaurantName, axiosSecure]);

  return (
    <div className="max-w-7xl mx-auto min-h-screen ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3    mt-2">
      {foodItems.map((food, index) => (
        <a  key={index}>
          <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-[400px] h-[450px] mx-auto px-2">
            <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
              <img src={food.foodImage} alt={food.foodName} className="h-[240px] w-[300px] object-cover mb-3" />
            </div>
            <div className="p-4">
              <div className="mb-4 rounded-full bg-cyan-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
                {food.category || "POPULAR"}
              </div>
              <p className="mb-4 rounded-full bg-[#ff0000d8] py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-40 text-center">
                {food.foodName || "Unavilable"}
              </p>
            <div className="flex justify-between">
            <p className="text-[#ff1818] text-[14px] ">
                Delicious {food.foodName} from <br /> {restaurantName}. Price: ${food.price}
                
              </p>
              <div className="w-[80px] rounded-full ">
              <button className="text-xl font-bold bg-[#ff0000d8] text-white  hover:bg-[#ff0000d8] rounded-full shadow-2xl p-3  btn   "><span className=""><MdOutlineAddCircleOutline /></span></button>

              </div>
            </div>
            </div>
          </div>
        </a>
      ))}
    </div>
    </div>
  );
};

export default DetailsRestaurants;
