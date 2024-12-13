import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Card, Checkbox, Input, Typography } from '@material-tailwind/react';

const Profile = () => {
    const { createUser, googleAuth, user, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit,  formState: { errors }, } = useForm();
    const onSubmit = data => {
        console.log(data);
      
    }             
    return (
        <div className='max-w-7xl mx-auto'>
        
              <div className="card-body">
                            <Card color="  transparent" className="" shadow={false}>
                                <p className="text-2xl font-extrabold text-center mb-3 transition-all ">  Create Your Profile </p>



                                <form onSubmit={handleSubmit(onSubmit)} className="mt-3 mb-2 mx-auto w-full ">
                                    <div className="mb-1 flex flex-col gap-6">

                                        <Input size="lg"
                                            name="restaurantName"
                                            type="text"
                                            label="Restaurant Name"
                                            {...register("restaurantName", { required: true })}

                                        />
                                        {errors.restaurantName && <span className="text-red-600 text-sm font-bold">This field is required</span>}

                                        <Input
                                            size="lg"
                                            name="restaurantEmail"
                                            type="email"
                                            label="Restaurant Email"
                                            {...register("restaurantEmail", { required: true })}
                                        />
                                        {errors.restaurantEmail && <span className="text-red-600 text-sm font-bold">This field is required</span>}

                                        <Input
                                            size="lg"
                                            name="restaurantAddress"
                                            type="text"
                                            label="Restaurant Address"
                                            {...register("restaurantAdddress", { required: true })}
                                        />
                                        {errors.restaurantAdddress && <span className="text-red-600 text-sm font-bold">This field is required</span>}
                                        <Input
                                            size="lg"
                                            name="restaurantNumber"
                                            type="number"
                                            label="Restaurant Number"
                                            {...register("restaurantNumber", { required: true })}
                                        />
                                        {errors.restaurantNumber && <span className="text-red-600 text-sm font-bold">This field is required</span>}
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
                                   
                                    </div>
                                    <input type="file" name='photo' accept='image/*' className="file-input file-input-ghost w-full max-w-xs" />
                                    <Checkbox
                                        label={
                                            <Typography
                                                variant="small"
                                                color="gray"
                                                className="flex items-center font-normal"
                                            >
                                                I agree the
                                                <a
                                                    href="#"
                                                    className="font-medium transition-colors hover:text-gray-900"
                                                >
                                                    &nbsp;Terms and Conditions
                                                </a>
                                            </Typography>

                                        }
                                        containerProps={{ className: "-ml-2.5" }}
                                    />
                                    <br />
                                    <button className=" w-full uppercase bg-[#ea9540fd] hover:bg-[#ea9540fd] text-white mt-2 btn rounded-badge" fullWidth>
                                        Continue
                                    </button>
                                    <div className="divider">OR</div>
                                    <Typography color="gray" className="mt-4 text-center font-normal">
                                    Already have an account?{" "}
                                    <a href="/profileLogin" className="font-medium text-gray-900">
                                        Profile Login
                                    </a>
                                </Typography>

                                </form>

                               
                               
                            </Card>
                        </div>
        </div>
    );
};

export default Profile;