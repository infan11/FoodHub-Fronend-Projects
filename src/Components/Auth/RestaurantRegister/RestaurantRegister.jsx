import {
    Card,
    Input,
    Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { imageUpload } from '../../Hooks/imageHooks';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const RestaurantRegister = () => {
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const logo = data.photo?.[0]; // Photo input for logo
        const banner = data.banner?.[0]; // Photo input for banner

        if (!logo || !banner) {
            toast.error("Please upload both logo and banner images.");
            return;
        }

        try {
            const logoData = await imageUpload(logo);
            const bannerData = await imageUpload(banner);

            // Create the user in Firebase Authentication
            const userResponse = await createUser(data.email, data.password);
            await updateUserProfile(data.displayName, logoData?.data?.display_url || "");

            const usersInfo = {
                name: data.displayName,
                email: data.email,
                restaurantAddress: data.restaurantAddress,
                restaurantNumber: parseFloat(data.restaurantNumber),
                photo: logoData?.data?.display_url || "",
                banner: bannerData?.data?.display_url || "",
            };

            toast.promise(
                axiosSecure.put("/users", usersInfo),
                {
                    loading: 'Loading...',
                    success: 'Successfully Signed In',
                    error: <b>Could not save user.</b>,
                }
            );

            navigate(from, { replace: true });

        } catch (error) {
            toast.error(typeof error === "string" ? error : "Something went wrong.");
        }
    };

    return (
        <div className="hero min-h-screen mx-auto px-4 md:px-5">
            <div className="grid md:grid-cols-2 rounded-r-2xl shadow-xl">
                <div className="text-center hidden sm:block">
                    <img
                        className="md:w-[670px] md:h-[810px] lg:w-[690px] lg:h-[740px] rounded-l-2xl"
                        src="https://i.ibb.co/nBHCFg8/seller-Mode.png"
                        alt="Seller Mode"
                    />
                </div>
                <div className="lg:w-full shrink-0 rounded-r-2xl shadow-xl">
                    <Card color="transparent" shadow={false}>
                        <p className="text-2xl font-extrabold text-center mb-3">SIGN IN</p>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 mb-2 mx-auto px-4 md:px-6 w-full">
                            <div className="mb-1 md:w-full lg:w-96 mx-auto space-y-2 gap-6">
                                <Input
                                    size="lg"
                                    type="text"
                                    label="Restaurant Name"
                                    {...register("displayName", { required: true })}
                                />
                                {errors.displayName && <span className="text-red-500 text-sm">This field is required</span>}

                                <Input
                                    size="lg"
                                    type="email"
                                    label="Restaurant Email"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span className="text-red-500 text-sm">This field is required</span>}

                                <Input
                                    size="lg"
                                    type="password"
                                    label="Password"
                                    {...register("password", { required: true, minLength: 6, maxLength: 8 })}
                                />
                                {errors.password?.type === 'minLength' && <span className="text-red-500">Password must be at least 6 characters</span>}
                                {errors.password?.type === 'maxLength' && <span className="text-red-500">Password must not exceed 8 characters</span>}

                                <input type="file" accept="image/*" {...register("photo", { required: true })} />
                                <input type="file" accept="image/*" {...register("banner", { required: true })} />

                                <button className="w-full bg-[#ff1818] text-white mt-2 btn rounded-badge" type="submit">
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default RestaurantRegister;
