import React from 'react';


import {
    Drawer,
    Button,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
import { PiHamburgerThin } from "react-icons/pi";
import { Link, Outlet } from 'react-router-dom';
import { LuUserSearch } from "react-icons/lu";import { FaRegUser } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { RiAdminLine } from "react-icons/ri";
import { RiShoppingBag4Line } from "react-icons/ri";
import { MdOutlineAddModerator } from "react-icons/md"
import Darkmode from '../../Darkmode/Darkmode';
import useAllUserHooks from '../../Hooks/useAllUserHooks';
import { PiContactlessPaymentLight } from "react-icons/pi";
import { RiHome9Line } from "react-icons/ri";
import useAuth from '../../Hooks/useAuth';
import useAdmin from '../../Hooks/useAdmin';
import useModerator from '../../Hooks/usemoderator';
import userRestaurantOwner from '../../Hooks/userRestaurantOwner';
const Dashboard = () => {
 const [users] = useAllUserHooks();
 const {user} = useAuth();
 const [isAdmin] = useAdmin()
 const [isModerator] = useModerator()
 const [isRestaurantOwner] = userRestaurantOwner()
  const [openRight, setOpenRight] = React.useState(false);
    const openDrawerRight = () => setOpenRight(true);
    const closeDrawerRight = () => setOpenRight(false);
    return (
        <div className='min-h-screen'>
            <div className="navbar">
  <div className="flex-none">
    <div className='bg-white shadow-2xl'>
  <button onClick={openDrawerRight} className='text-red-600 text-4xl font-bold'><PiHamburgerThin /></button>

    </div>
  <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4"
      >
       <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
        DASHBOARD
          </Typography>
         
        </div>
         <List>
        {
        isAdmin   ?  <>
            <Link to={"/dashboard/adminHome"}>
          <ListItem>
            <ListItemPrefix>
            <RiAdminLine />
            </ListItemPrefix>
          Admin Home
          </ListItem>
          </Link>
      
        <Link to={"/dashboard/users"}>
        
        <ListItem>
            <ListItemPrefix>
           <LuUserSearch />
            </ListItemPrefix>
            Users
          </ListItem>
        </Link>
          <Link to={"/dashboard/myCart"}>
          <ListItem>
            <ListItemPrefix>
            <RiShoppingBag4Line />
            </ListItemPrefix>
            My Cart
          </ListItem>
          </Link>
      
          <Link to={"/dashboard/updateFood"}>
          <ListItem>
            <ListItemPrefix>
            <RxUpdate />
            </ListItemPrefix>
            Update Food
          </ListItem>
          </Link>
          <Link to={"/dashboard/moderator"}>
          <ListItem>
            <ListItemPrefix>
            <MdOutlineAddModerator />
            </ListItemPrefix>
            Moderator Home
          </ListItem>
          </Link>
          <Link to={"/dashboard/addFoods"}>
          <ListItem>
            <ListItemPrefix>
            <RxUpdate />
            </ListItemPrefix>
            Add Food
          </ListItem>
          </Link>
    
          <Link to={"/dashboard/RrestaurantProfile"}>
          <ListItem>
            <ListItemPrefix>
            <RxUpdate />
            </ListItemPrefix>
            Owner User
          </ListItem>
          </Link>
          <div className='divider-start'></div>
          <Link to={"/"}>
          <ListItem>
            <ListItemPrefix>
            <RiHome9Line />
            </ListItemPrefix>
          Home
          </ListItem>
          </Link>
          </> : <>
          <Link to={"/dashboard/myCart"}>
          <ListItem>
            <ListItemPrefix>
            <RiShoppingBag4Line />
            </ListItemPrefix>
            My Order
          </ListItem>
          </Link>
       <Link to={"/dashboard/paymentHistory"}>
          <ListItem>
            <ListItemPrefix>
            <PiContactlessPaymentLight />
            </ListItemPrefix>
            Payment History
          </ListItem>
          </Link>
          </>
        }
          {
           isModerator ? <>
             <Link to={"/dashboard/moderator"}>
          <ListItem>
            <ListItemPrefix>
            <MdOutlineAddModerator />
            </ListItemPrefix>
            Moderator Home
          </ListItem>
          </Link>
          <Link to={"/dashboard/RrestaurantProfile"}>
          <ListItem>
            <ListItemPrefix>
            <RxUpdate />
            </ListItemPrefix>
            Owner User
          </ListItem>
          </Link>
        <Link to={"/dashboard/users"}>
        
        <ListItem>
            <ListItemPrefix>
           <LuUserSearch />
            </ListItemPrefix>
            Users
          </ListItem>
        </Link>
          <Link to={"/dashboard/myCart"}>
          <ListItem>
            <ListItemPrefix>
            <RiShoppingBag4Line />
            </ListItemPrefix>
            My Cart
          </ListItem>
          </Link>
      
          <Link to={"/dashboard/updateFood"}>
          <ListItem>
            <ListItemPrefix>
            <RxUpdate />
            </ListItemPrefix>
            Update Food
          </ListItem>
        
          </Link>
          <div className='divider-start'></div>
          <Link to={"/"}>
          <ListItem>
            <ListItemPrefix>
            <RxUpdate />
            </ListItemPrefix>
          Home
          </ListItem>
          </Link>
          </> : <>
          
         
          </>
        }

       {
       isRestaurantOwner ? <>
 
        <Link to={"/dashboard/ownerHome"}>
          <ListItem>
            <ListItemPrefix>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            </ListItemPrefix>
           Owner Home
          </ListItem>
          </Link>
          <Link to={"/dashboard/myCart"}>
          <ListItem>
            <ListItemPrefix>
            <RiShoppingBag4Line />
            </ListItemPrefix>
            My Cart
          </ListItem>
          </Link>
      
          <Link to={"/dashboard/updateFood"}>
          <ListItem>
            <ListItemPrefix>
            <RxUpdate />
            </ListItemPrefix>
            Update Food
          </ListItem>
          </Link>
         
      
       </> : <> 
       <div className='divider-start'></div>
          <Link to={"/"}>
          <ListItem>
            <ListItemPrefix>
            <RiHome9Line />
            </ListItemPrefix>
          Home
          </ListItem>
          </Link>
        </>
}

     
      
       
      
      
        </List> 
       
        <Button className="mt-3 bg-[#ff0000d8] w-full" size="sm"> 
        <Darkmode/>
        </Button>
      </Drawer>

  </div>
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">DASHBOARD</a>
  </div>
  <div className="flex-none">
    <button className="btn btn-square btn-ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-5 w-5 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
      </svg>
    </button>
  </div>
</div>
<Outlet></Outlet>
        </div>
    );
};

export default Dashboard; 