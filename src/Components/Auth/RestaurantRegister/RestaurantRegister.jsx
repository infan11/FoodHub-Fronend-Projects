import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { imageUpload } from '../../Hooks/imageHooks';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from "react-router-dom";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const RestaurantRegister = () => {
    const { createUser, googleAuth, user, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const from = location.state?.from?.pathname || "/";
    // const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onSubmit = async data => {
        console.log(data);
        const photo = data.photo?.[0];
        const imageData = await imageUpload(photo);
        createUser(data.email, data.password)
            .then(res => {
                const registerUser = res.user;
                console.log(registerUser);
                updateUserProfile(data.name, imageData?.data?.display_url || "")
                    .then(() => {
                        const usersInfo = {
                            
                            name : data.name,
                            email: data.email,
                            restaurantAdddress : data.restaurantAdddress,
                            restaurantNumber : parseFloat(data.restaurantNumber),
                            photo: imageData?.data?.display_url  || " "
                        };
                        return toast.promise(
                            axiosSecure.put("/users", usersInfo),
                            {
                                loading: 'Loading...',
                                success: `Successfully Signin`,
                                error: <b>Could not save user.</b>,
                                
                            },
                           
                            navigate(from, { replace: true })
                        )
                    
                      } 
                     
                     )
                
       
            })
            .catch(error => {
                if(error.code === "auth/email-already-in-use"){
                    toast.error("Allready user in this Website! please try again")

                }
                else if(error.code === "auth/network-request-failed"){
                   toast.error("Please connect your internet")
                }
            
            }) 
            // form.reset()
           
    }

    return (
        <div className="">
            <div className="hero  min-h-screen  mx-auto md:px-5">
                <div data-aos="zoom-in" className="grid md:grid-cols-2 rounded-r-2xl shadow-2xl">
                    <div className="text-center hidden sm:block ">
                        <img className=" md:w-[670px] md:h-[810px] lg:w-[690px] lg:h-[740px]   rounded-l-2xl" src="https://i.ibb.co.com/nBHCFg8/seller-Mode.png" alt="" />
                    </div>
                    <div className="  lg:w-full bg-white shrink-0 rounded-r-2xl shadow-2xl">
                        <div className="card-body">
                            <Card color="  transparent" className="" shadow={false}>
                                <p className="text-2xl font-extrabold text-center mb-3  transition-all "> SIGNIN </p>
                                <form onSubmit={handleSubmit(onSubmit)} className="mt-3 mb-2 mx-auto w-full ">
                                    <div className="mb-1  md:w-full lg:w-96 mx-auto space-y-2 gap-6">

                                        <Input size="lg"
                                            name="name"
                                            type="text"
                                            label="Restaurant Name"
                                            {...register("name", { required: true })}

                                        />
                                        {errors.name && <span className="text-red-600 text-sm ">This field is required</span>}

                                        <Input
                                            size="lg"
                                            name="email"
                                            type="email"
                                            label="Restaurant Email"
                                            {...register("email", { required: true })}
                                        />
                                        {errors.email && <span className="text-red-600 text-sm ">This field is required</span>}

                                        <Input
                                            size="lg"
                                            name="restaurantAddress"
                                            type="text"
                                            label="Restaurant Address"
                                            {...register("restaurantAdddress", { required: true })}
                                        />
                                        {errors.restaurantAdddress && <span className="text-red-600 text-sm ">This field is required</span>}
                                        <Input
                                            size="lg"
                                            name="restaurantNumber"
                                            type="number"
                                            label="Restaurant Number"
                                            {...register("restaurantNumber", { required: true })}
                                        />
                                        {errors.restaurantNumber && <span className="text-red-600 text-sm ">This field is required</span>}

                                        <Input
                                            type="password"
                                            name="password"
                                            size="lg"
                                            placeholder="********"
                                            className=""
                                            label="Password"
                                            {...register("password", { required: true, minLength: 6, maxLength: 8 })}
                                        />
                                        {errors.password?.type && <span className="text-red-600">This field is reqiure</span>}
                                        {errors.password?.type === 'minLength' && <span className="text-red-600">This pass must 6 Characters</span>}
                                        {errors.password?.type === 'maxLength' && <span className="text-red-600">This pass only 8 Characters</span>}

                                        <input type="file" name='photo' accept='image/*'
                                            {...register("photo", { required: true })}

                                            className="file-input file-input-ghost  max-w-xs" />
                                        <br />
                                        {errors.photo && <span className="text-red-600 text-sm ">This field is required</span>}
                                    </div>

                                    <Typography color="gray" className="mt-4 text-center font-normal">
                                        Buyer Mode? Now{" "}
                                        <a href="/register" className="font-medium text-gray-900">
                                            Sign up
                                        </a>
                                    </Typography>

                                    <button className=" w-full uppercase bg-[#ea9540fd] hover:bg-[#ea9540fd] text-white mt-2 btn rounded-badge" fullWidth>
                                        Submit Request
                                    </button>



                                </form>


                                {/* <div className=" mx-auto "> <button onClick={handelGoogle} className="flex text-[14px] items-center font-bold btn rounded-full"><FcGoogle /> Continue With Google</button></div> */}
                                <Typography color="gray" className="mt-4 text-center font-normal">
                                    Already have an account?{" "}
                                    <a href="/login" className="font-medium text-gray-900">
                                        Sign up
                                    </a>
                                </Typography>

                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantRegister;