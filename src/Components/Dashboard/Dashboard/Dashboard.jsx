import React from "react";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { PiHamburgerThin } from "react-icons/pi";
import { Link, Outlet } from "react-router-dom";
import { LuUserSearch } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { RiAdminLine, RiShoppingBag4Line, RiHome9Line } from "react-icons/ri";
import { MdOutlineAddModerator } from "react-icons/md";
import { PiContactlessPaymentLight } from "react-icons/pi";
import Darkmode from "../../Darkmode/Darkmode";
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";
import useModerator from "../../Hooks/useModerator";
import useRestaurantOwner from "../../Hooks/useRestaurantOwner";
import { IoIosAddCircleOutline, IoMdLogIn } from "react-icons/io";
import { HiLogout } from "react-icons/hi";
const Dashboard = () => {
  const { user , logout } = useAuth();
  const [isAdmin] = useAdmin();
  const [isModerator] = useModerator();
  const [isOwner] = useRestaurantOwner();

  console.log("isAdmin:", isAdmin);
  console.log("isModerator:", isModerator);
  console.log("isOwner:", isOwner);
const handleLogout = () => {
  logout()
  .then(() => {})
}
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <div className="navbar bg-white shadow-2xl">
        <div className="flex-none ">
          <label
            htmlFor="my-drawer-4"
            className="text-4xl font-bold cursor-pointer "
          >
            <a className="text-[#ff1818]"><PiHamburgerThin /></a>
          </label>
        </div>
        <div className="flex-1">
          <span className="text-xl font-bold text-[#ff1818]">DASHBOARD</span>
        </div>
      </div>

      {/* Drawer */}
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Main Content */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <ul className="menu bg-[#ff0000] text-white font-bold min-h-full w-80 p-4">
            <Typography variant="h5" color="white" className="mb-4">
              DASHBOARD
            </Typography>

          
            {isAdmin && (
              <>
                <Link to="/dashboard/adminHome">
                  <ListItem>
                    <ListItemPrefix>
                      <RiAdminLine />
                    </ListItemPrefix>
                    Admin Home
                  </ListItem>
                </Link>
                <Link to="/dashboard/users">
                  <ListItem>
                    <ListItemPrefix>
                      <LuUserSearch />
                    </ListItemPrefix>
                    Users
                  </ListItem>
                </Link>
                <Link to="/dashboard/myOrder">
                  <ListItem>
                    <ListItemPrefix>
                      <RiShoppingBag4Line />
                    </ListItemPrefix>
                    My Order
                  </ListItem>
                </Link>
                <Link to="/dashboard/paymentHistory">
                  <ListItem>
                    <ListItemPrefix>
                      <PiContactlessPaymentLight />
                    </ListItemPrefix>
                    Payment History
                  </ListItem>
                </Link>
                <Link to="/dashboard/updateFood">
                  <ListItem>
                    <ListItemPrefix>
                      <RxUpdate />
                    </ListItemPrefix>
                    Update Food
                  </ListItem>
                </Link>
                <Link to="/dashboard/moderator">
                  <ListItem>
                    <ListItemPrefix>
                      <MdOutlineAddModerator />
                    </ListItemPrefix>
                    Moderator Home
                  </ListItem>
                </Link>
                <Link to="/dashboard/ownerHome">
                  <ListItem>
                    <ListItemPrefix>
                      <FaRegUser />
                    </ListItemPrefix>
                    Owner Home
                  </ListItem>
                </Link>
                <Link to="/dashboard/userHome">
                  <ListItem>
                    <ListItemPrefix>
                      <FaRegUser />
                    </ListItemPrefix>
                    User Home
                  </ListItem>
                </Link>
                <Link to="/dashboard/addFoods">
                  <ListItem>
                    <ListItemPrefix>
                    <IoIosAddCircleOutline />
                    </ListItemPrefix>
                    Add Food
                  </ListItem>
                </Link>
              </>
            )}

            {/* Moderator Links */}
            {!isAdmin && isModerator && (
              <>
                <Link to="/dashboard/moderator">
                  <ListItem>
                    <ListItemPrefix>
                      <MdOutlineAddModerator />
                    </ListItemPrefix>
                    Moderator Home
                  </ListItem>
                </Link>
               
                <Link to="/dashboard/updateFood">
                  <ListItem>
                    <ListItemPrefix>
                      <RxUpdate />
                    </ListItemPrefix>
                    Update Food
                  </ListItem>
                </Link>
            
                <Link to="/dashboard/ownerHome">
                  <ListItem>
                    <ListItemPrefix>
                      <FaRegUser />
                    </ListItemPrefix>
                    Owner Home
                  </ListItem>
                </Link>
                <Link to="/dashboard/userHome">
                  <ListItem>
                    <ListItemPrefix>
                      <FaRegUser />
                    </ListItemPrefix>
                    User Home
                  </ListItem>
                </Link>
                <Link to="/dashboard/addFoods">
                  <ListItem>
                    <ListItemPrefix>
                    <IoIosAddCircleOutline />
                    </ListItemPrefix>
                    Add Food
                  </ListItem>
                </Link>
                <Link to="/dashboard/updateFood">
                  <ListItem>
                    <ListItemPrefix>
                      <RxUpdate />
                    </ListItemPrefix>
                    Update Food
                  </ListItem>
                </Link>
                <Link to="/dashboard/myOrder">
                  <ListItem>
                    <ListItemPrefix>
                      <RiShoppingBag4Line />
                    </ListItemPrefix>
                    My Order
                  </ListItem>
                </Link>
                <Link to="/dashboard/paymentHistory">
                  <ListItem>
                    <ListItemPrefix>
                      <PiContactlessPaymentLight />
                    </ListItemPrefix>
                    Payment History
                  </ListItem>
                </Link>
              </>
            )}

            {/* Owner Links */}
            {!isAdmin && !isModerator && isOwner && (
              <>
                <Link to="/dashboard/ownerHome">
                  <ListItem>
                    <ListItemPrefix>
                      <FaRegUser />
                    </ListItemPrefix>
                    Owner Home
                  </ListItem>
                </Link>
                <Link to="/dashboard/addFoods">
                  <ListItem>
                    <ListItemPrefix>
                    <IoIosAddCircleOutline />
                    </ListItemPrefix>
                    Add Food
                  </ListItem>
                </Link>
                <Link to="/dashboard/updateFood">
                  <ListItem>
                    <ListItemPrefix>
                      <RxUpdate />
                    </ListItemPrefix>
                    Update Food
                  </ListItem>
                </Link>
                <Link to="/dashboard/myOrder">
                  <ListItem>
                    <ListItemPrefix>
                      <RiShoppingBag4Line />
                    </ListItemPrefix>
                    My Order
                  </ListItem>
                </Link>
                <Link to="/dashboard/paymentHistory">
                  <ListItem>
                    <ListItemPrefix>
                      <PiContactlessPaymentLight />
                    </ListItemPrefix>
                    Payment History
                  </ListItem>
                </Link>
              </>
            )}

            {/* General User Links */}
            {!isAdmin && !isModerator && !isOwner && (
              <>
              <Link to="/dashboard/userHome">
                  <ListItem>
                    <ListItemPrefix>
                      <FaRegUser />
                    </ListItemPrefix>
                    User Home
                  </ListItem>
                </Link>
                <Link to="/dashboard/myOrder">
                  <ListItem>
                    <ListItemPrefix>
                      <RiShoppingBag4Line />
                    </ListItemPrefix>
                    My Order
                  </ListItem>
                </Link>
                <Link to="/dashboard/paymentHistory">
                  <ListItem>
                    <ListItemPrefix>
                      <PiContactlessPaymentLight />
                    </ListItemPrefix>
                    Payment History
                  </ListItem>
                </Link>
              </>
            )}

            {/* Common Links */}
            <div className="divider"></div>
            <Link to="/">
              <ListItem>
                <ListItemPrefix>
                  <RiHome9Line />
                </ListItemPrefix>
                  Home
              </ListItem>
            </Link>

            {/* Dark Mode Toggle */}
            <Button className="mt-4 bg-[#ff1818] shadow-2xl w-full" size="sm">
              <Darkmode />
            </Button>
            <br />
            <div className=" mt-20 md:mt-16 lg:mt-20 mx-auto">
           {
            user ? <>
            <button className="btn  w-[200px] rounded-full bg-white text-[#ff1818] " onClick={handleLogout}><HiLogout /> Logout</button>
            </> : <><Link to={"/login"}>
            <button className="btn mt-64 w-[200px] rounded-full bg-white text-[#ff1818] " ><IoMdLogIn />LOGIN</button>
            </Link></>
           }
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
