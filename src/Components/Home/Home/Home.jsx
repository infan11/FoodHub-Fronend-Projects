import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import BannerTwo from "../BannerTwo/BannerTwo";
import ServeFood from "../ServeFood/ServeFood";
import Food from "../Food/Food";
import AvailableItem from "../AvailableItem/AvailableItem";
import BannerFour from "../bannerFour/BannerFour";
import DistrictAvailable from "../DistrictAvailable/DistrictAvailable/DistrictAvailable";

const Home = () => {
    return (
        <div className="">
            <Helmet>
                <title>FOODHUB - HOME</title>
            </Helmet>
         <Banner/>
         <BannerTwo/>
         <BannerFour/>
         <AvailableItem/>
         <ServeFood/>
         <DistrictAvailable/>
        </div>
    );
};

export default Home;