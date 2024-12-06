
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


const Main = () => {
    const location = useLocation();
    const noNavbarFooter = ["/login" , "/register"].includes(location.pathname);
    return (
        <div>
          { noNavbarFooter || <Navbar/>  }
            <Outlet/>
        </div>
    );
};

export default Main;