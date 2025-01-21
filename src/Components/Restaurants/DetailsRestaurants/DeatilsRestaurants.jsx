import useRestaurantData from "../../Hooks/useRestaurantData";


const DeatilsRestaurants = () => {
    const [isRestaurantData] = useRestaurantData();
    console.log("data find",isRestaurantData);
    return (
        <div>
         {
            isRestaurantData.map(isRestaurantDatas => <p>{isRestaurantDatas.restaurantName}</p>)
         }
        </div>
    );
};

export default DeatilsRestaurants;