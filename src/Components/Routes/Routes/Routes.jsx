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

import RestaurantRegister from "../../Auth/RestaurantRegister/RestaurantRegister";
import RrestaurantProfile from "../../Dashboard/RrestaurantProfile/RrestaurantProfile";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import AdminHome from "../../Dashboard/AdminHome/AdminHome";
import ModeratorHome from "../../Dashboard/ModeratorHome/ModeratorHome";
import OwnerHome from "../../Dashboard/OwnerHome/OwnerHome";
import UserHome from "../../Dashboard/UserHome/UserHome";
import MyCart from "../../Dashboard/MyCart/MyCart";
import UpdateFood from "../../Dashboard/UpdateFood/UpdateFood";
import PaymentHistory from "../../Dashboard/PaymentHistory/PaymentHistory";
import Biryani from "../../Home/Biryani/Biryani";
import Pizza from "../../Home/Pizza/Pizza";
import Chicken from "../../Home/Home/Chicken/Chicken";
import Chinese from "../../Home/Chinese/Chinese";
import Juice from "../../Home/Juice/Juice";
import Cake from "../../Home/Cake/Cake";
import Beef from "../../Home/Beef/Beef";
import Burger from "../../Home/Home/Burger/Burger";
import Users from "../../Dashboard/Users/Users";

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
        path: "/biryani",
        element: <Biryani/>
      },
      {
        path: "/pizza",
        element: <Pizza/>
      },
      {
        path: "/chicken",
        element: <Chicken/>
      },
      {
        path: "/chinese",
        element: <Chinese/>
      },
      {
        path: "/juice",
        element: <Juice/>
      },
      {
        path: "/cake",
        element: <Cake/>
      },
      {
        path: "/beef",
        element: <Beef/>
      },
      {
        path: "/burger",
        element: <Burger/>
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
    element : <Dashboard/>,
    children : [
     {
      path : "/dashboard/addFoods",
      element : <AddFoods/>
     },
     {
      path : "/dashboard/RrestaurantProfile",
      element : <RrestaurantProfile/>
     },
     {
      path : "/dashboard/adminHome",
      element :<AdminHome/>
     },
     {
      path : "/dashboard/moderator",
      element : <ModeratorHome/>
     },
     {
      path : "/dashboard/ownerHome",
      element : <OwnerHome/>
     },
     {
      path : "/dashboard/userHome",
      element : <UserHome></UserHome> 
     },
     {
      path : "/dashboard/myCart",
      element : <MyCart/>
     },
     {
      path : "/dashboard/updateFood",
      element : <UpdateFood/>
     },
     {
      path : "/dashboard/users",
      element :<Users/>
     },
     {
      path : "/dashboard/paymentHistory",
      element :<PaymentHistory/>
     },
    ]
  }
]);
 