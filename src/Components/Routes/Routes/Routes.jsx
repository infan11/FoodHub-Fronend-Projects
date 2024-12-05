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
      }
    ]
  },
]);
