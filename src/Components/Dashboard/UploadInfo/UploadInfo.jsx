import React, { useState } from "react";
import {
    Card,
    Input,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { imageUpload } from '../../Hooks/imageHooks';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const UploadInfo = () => {
    const { updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // const from = location.state?.from?.pathname || "/";
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const [isSubmitting, setIsSubmitting] = useState(false); // Track submission
    const {
        register, handleSubmit, formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            restaurantName: user?.displayName  || "Default Restaurant",
            email : user?.email  || "Default Email  "
            

        },
    });
    const onSubmit = async (data) => {
        const logo = data.photo?.[0]; // Photo input for logo
        const banner = data.banner?.[0]; // Photo input for banner

        if (!logo || !banner) {
            toast.error("Please upload both logo and banner images.");
            return;
        }

        try {
            setIsSubmitting(true); // Prevent further submissions
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

            await validateImage(logo, 300, 300);
            await validateImage(banner, 1080, 1080);
            const logoData = await imageUpload(logo);
            const bannerData = await imageUpload(banner);

            await updateUserProfile(data.restaurantName, logoData?.data?.display_url || "");

            const usersInfo = {
                restaurantName: data.restaurantName,
                email: data.email,
                restaurantAddress: data.restaurantAddress,
                restaurantNumber: parseFloat(data.restaurantNumber),
                resataurantCategory: data.resataurantCategory,
                photo: logoData?.data?.display_url || " ",
                banner: bannerData?.data?.display_url || " ",
            };

            await toast.promise(
                axiosSecure.post("/restaurantUpload", usersInfo),
                {
                    loading: 'Submitting...',
                    success: 'Restaurant successfully added!',
                    error: 'Could not save restaurant.',
                }
            );

            navigate("/restaurants"); // Redirect after successful submission
        } catch (error) {
            toast.error(typeof error === "string" ? error : "Something went wrong.");
        } finally {
            setIsSubmitting(false); // Allow submission again in case of an error
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Restaurant</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[#ff0000d8] font-semibold">Restaurant Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md bg-gray-100 text-[#ff0000d8]"
                                {...register("restaurantName", { required: true })}
                                readOnly
                            />
                            {errors.restaurantName && <span className="text-red-500 text-sm">This field is required</span>}
                        </div>
                        <div>
                            <label className="text-[#ff0000d8] font-semibold">Restaurant Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border rounded-md  text-[#ff0000d8]"
                                {...register("email", { required: true })}
                                readOnly
                            />
                            {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <label className="text-[#ff0000d8] font-semibold">Restaurant Address</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md text-[#ff0000d8]"
                            {...register("restaurantAddress", { required: true })}
                        />
                        {errors.restaurantAddress && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>
                    
                    <div>
                        <label className="text-[#ff0000d8] font-semibold">Restaurant Number</label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded-md text-[#ff0000d8]"
                            {...register("restaurantNumber", { required: true })}
                        />
                        {errors.restaurantNumber && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>

                    <div>
                        <label className="text-[#ff0000d8] font-semibold">Restaurant Category</label>
                        <select
                            className="w-full p-2 border rounded-md text-[#ff0000d8]"
                            {...register("restaurantCategory", { required: true })}
                        >
                            <option value="" disabled selected>Choose your Restaurant Category</option>
                            <option>Biryani</option>
                            <option>Pizza</option>
                            <option>Burger</option>
                            <option>Cake</option>
                            <option>Chicken</option>
                            <option>Juice</option>
                            <option>Beef</option>
                            <option>Chinese</option>
                        </select>
                        {errors.restaurantCategory && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[#ff0000d8] font-semibold">Upload Logo (300×300)</label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("photo", { required: true })}
                                className="w-full p-2 border rounded-md"
                            />
                            {errors.photo && <span className="text-red-500 text-sm">Logo is required</span>}
                        </div>
                        <div>
                            <label className="text-[#ff0000d8] font-semibold">Upload Banner (1080×1080)</label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("banner", { required: true })}
                                className="w-full p-2 border rounded-md"
                            />
                            {errors.banner && <span className="text-red-500 text-sm">Banner is required</span>}
                        </div>
                    </div>
                    
                    <button
                        className={`w-full py-2 mt-4 text-white bg-red-600 hover:bg-red-700 rounded-md ${isSubmitting ? "opacity-50" : ""}`}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Add Restaurant"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadInfo;
