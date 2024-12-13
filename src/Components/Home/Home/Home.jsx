import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import BannerTwo from "../BannerTwo/BannerTwo";
import ServeFood from "../ServeFood/ServeFood";
import Food from "../Food/Food";

const Home = () => {
    return (
        <div className="">
            <Helmet>
                <title>FOODHUB - HOME</title>
            </Helmet>
         <Banner/>
         <BannerTwo/>
         <ServeFood/>
         <Food/>
        </div>
    );
};

export default Home;