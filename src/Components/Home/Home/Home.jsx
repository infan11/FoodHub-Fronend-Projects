import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import BannerTwo from "../BannerTwo/BannerTwo";
import ServeFood from "../ServeFood/ServeFood";
import Food from "../Food/Food";
import AvailableItem from "../AvailableItem/AvailableItem";

const Home = () => {
    return (
        <div className="">
            <Helmet>
                <title>FOODHUB - HOME</title>
            </Helmet>
         <Banner/>
         <BannerTwo/>
         <ServeFood/>
         <AvailableItem/>
        </div>
    );
};

export default Home;