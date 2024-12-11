import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import BannerTwo from "../BannerTwo/BannerTwo";

const Home = () => {
    return (
        <div className="">
            <Helmet>
                <title>FOODHUB - HOME</title>
            </Helmet>
         <Banner/>
         <BannerTwo/>
        </div>
    );
};

export default Home;