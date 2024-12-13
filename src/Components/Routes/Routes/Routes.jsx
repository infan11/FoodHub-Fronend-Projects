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
      path : "/dashboard/profile",
      element : <Profile/>
     }
    ]
  }
]);
