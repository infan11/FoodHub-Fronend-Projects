import {
  createBrowserRouter,

} from "react-router-dom";
import Main from "../../Main/Main";
import Home from "../../Home/Home/Home";
import Restaurants from "../../Restaurants/Restaurants/Restaurants";
import Food from "../../Food/Food/Food";
import About from "../../About/About/About";
import Login from "../../Auth/Login/Login";
import Register from "../../Auth/Register/Register/Register";
import ResetPassword from "../../Auth/ResetPassword/ResetPassword";
import Dashboard from "../../Dashboard/Dashboard/Dashboard";
import AddFoods from "../../Dashboard/AddFoods/AddFoods";
import Profile from "../../Dashboard/Profle/Profile";
import Users from "../../Dashboard/users/users";
import RestaurantRegister from "../../Auth/RestaurantRegister/RestaurantRegister";
import RrestaurantProfile from "../../Dashboard/RrestaurantProfile/RrestaurantProfile";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    // TO DO : ERROR element
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/restaurants",
        element: <Restaurants />
      },
      {
        path: "/food",
        element: <Food />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/restaurantRegister",
        element: <RestaurantRegister/>
      },
      {
        path : "/resetPassword",
        element : <ResetPassword/>
      }
      
    ],
    
    
  },
  {
    path :"/dashboard",
    element : <PrivateRoutes><Dashboard/></PrivateRoutes>,
    children : [
     {
      path : "/dashboard/addFoods",
      element : <AddFoods/>
     },
     {
      path : "/dashboard/RrestaurantProfile",
      element :<PrivateRoutes> <RrestaurantProfile/></PrivateRoutes>
     },
     {
      path : "/dashboard/users",
      element : <PrivateRoutes><Users/>   </PrivateRoutes>
     }
    ]
  }
]);
 