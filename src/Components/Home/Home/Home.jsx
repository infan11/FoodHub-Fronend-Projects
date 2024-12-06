import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";

const Home = () => {
    return (
        <div className="text-red-500">
            <Helmet>
                <title>FOODHUB - HOME</title>
            </Helmet>
         <Banner/>
        </div>
    );
};

export default Home;