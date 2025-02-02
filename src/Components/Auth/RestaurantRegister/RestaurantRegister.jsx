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
        const logo = data.photo?.[0]; // Logo Image
        const banner = data.banner?.[0]; // Banner Image

        if (!logo || !banner) {
            toast.error("Please upload both logo and banner images.");
            return;
        }

        const validateImage = (file, maxWidth, maxHeight) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => {
                        if (img.width > maxWidth || img.height > maxHeight) {
                            reject(`Image must not exceed ${maxWidth}x${maxHeight} dimensions.`);
                        } else {
                            resolve();
                        }
                    };
                    img.onerror = () => reject("Invalid image file.");
                    img.src = e.target.result;
                };
                reader.onerror = () => reject("File reading error.");
                reader.readAsDataURL(file);
            });

        try {
            await validateImage(logo, 300, 300);
            await validateImage(banner, 1080, 1080);

            const logoData = await imageUpload(logo);
            const bannerData = await imageUpload(banner);

            const userResponse = await createUser(data.email, data.password);
            const registerUser = userResponse.user;

            // Ensure profile update with correct format
          await   updateUserProfile({
       name: data.displayName,
                photo: logoData?.data?.display_url || ""
            });

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
                    loading: 'Registering...',
                    success: 'Successfully Registered!',
                    error: <b>Could not register user.</b>,
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
                        src="https://i.ibb.co.com/nBHCFg8/seller-Mode.png"
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
                                    type="text"
                                    label="Restaurant Address"
                                    {...register("restaurantAddress", { required: true })}
                                />
                                {errors.restaurantAddress && <span className="text-red-500 text-sm">This field is required</span>}

                                <Input
                                    size="lg"
                                    type="number"
                                    label="Restaurant Number"
                                    {...register("restaurantNumber", { required: true })}
                                />
                                {errors.restaurantNumber && <span className="text-red-500 text-sm">This field is required</span>}

                                <Input
                                    type="password"
                                    size="lg"
                                    placeholder="********"
                                    label="Password"
                                    {...register("password", { required: true, minLength: 6, maxLength: 8 })}
                                />
                                {errors.password?.type === 'required' && <span className="text-red-500">This field is required</span>}
                                {errors.password?.type === 'minLength' && <span className="text-red-500">Password must be at least 6 characters</span>}
                                {errors.password?.type === 'maxLength' && <span className="text-red-500">Password must not exceed 8 characters</span>}

                                <div className="">
                                    <label className="label">
                                        <span className="label-text text-red-500 font-extrabold ml-4">Logo Should be 300×300</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        {...register("photo", { required: true })}
                                        className="file-input file-input-ghost"
                                    />
                                    {errors.photo && <span className="text-red-500 text-sm">Logo is required</span>}

                                    <label className="label">
                                        <span className="label-text text-red-500 font-extrabold ml-4">Banner Should be 1080×1080</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        {...register("banner", { required: true })}
                                        className="file-input file-input-ghost"
                                    />
                                    {errors.banner && <span className="text-red-500 text-sm ml-2">Banner is required</span>}
                                </div>
                            </div>

                            <button
                                className="w-full uppercase bg-[#ff1818] text-white mt-2 btn rounded-badge"
                                type="submit"
                            >
                                Submit Request
                            </button>
                        </form>

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
    );
};

export default RestaurantRegister;
