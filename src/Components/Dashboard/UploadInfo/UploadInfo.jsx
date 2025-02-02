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
        <div className="hero min-h-screen mx-auto px-4 md:px-5">

            <div className=" rounded-r-2xl shadow-xl px-6">

                <div className="lg:w-full shrink-0 rounded-r-2xl shadow-xl">
                    <Card color="transparent" shadow={false}>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 mb-2 mx-auto px-4 md:px-6 w-full">
                            <div className="mb-1 md:w-full lg:w-96 mx-auto space-y-2 gap-6">
                                <Input
                                    size="lg"
                                    name="name"
                                    type="text"
                                    label="Restaurant Name"
                                    {...register("restaurantName", { required: true })}
                                />
                                {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
                                <Input
                                    size="lg"
                                    name="email"
                                    type="email"
                                    label="Restaurant email"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span className="text-red-500 text-sm">This field is required</span>}

                                <Input
                                    size="lg"
                                    name="restaurantAddress"
                                    type="text"
                                    label="Restaurant Address"
                                    {...register("restaurantAddress", { required: true })}
                                />
                                {errors.restaurantAddress && <span className="text-red-500 text-sm">This field is required</span>}

                                <Input
                                    size="lg"
                                    name="restaurantNumber"
                                    type="number"
                                    label="Restaurant Number"
                                    {...register("restaurantNumber", { required: true })}
                                />
                                {errors.restaurantNumber && <span className="text-red-500 text-sm">This field is required</span>}
                                <select
                                    className="select select-error w-full max-w-xs"
                                    name="resataurantCategory"
                                    {...register("resataurantCategory", { required: true })}
                                >
                                    <option disabled selected>Choose your Restaurant Category</option>
                                    <option>Biryani</option>
                                    <option>Pizza</option>
                                    <option>Burger</option>
                                    <option>Cake</option>
                                    <option>Chicken</option>
                                    <option>Juice</option>
                                    <option>Beef</option>
                                    <option>Chinese</option>
                                </select>
                                {errors.resataurantCategory && <span className="text-red-500 text-sm">This field is required</span>}

                                <div>
                                    <label className="label">
                                        <span className="label-text text-red-500 font-extrabold ml-4">Logo Should be 300×300</span>
                                    </label>
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        {...register("photo", { required: true })}
                                        className="file-input file-input-ghost"
                                    />
                                    <label className="label">
                                        <span className="label-text text-red-500 font-extrabold ml-4">Banner Should be 1080×1080</span>
                                    </label>
                                    <input
                                        type="file"
                                        name="banner"
                                        accept="image/*"
                                        {...register("banner", { required: true })}
                                        className="file-input file-input-ghost"
                                    />
                                </div>
                                {errors.photo && <span className="text-red-500 text-sm">Logo is required</span>}
                                {errors.banner && <span className="text-red-500 text-sm ml-2">Banner is required</span>}
                            </div>

                            <button
                                className={`w-full uppercase bg-[#ff1818] text-white mt-2 btn rounded-badge ${isSubmitting ? "opacity-50" : ""}`}
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Add Restaurant"}
                            </button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default UploadInfo;
