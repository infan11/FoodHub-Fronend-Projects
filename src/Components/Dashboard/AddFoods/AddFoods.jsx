import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { imageUpload } from '../../Hooks/imageHooks';
import toast from 'react-hot-toast';

const AddFoods = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const axiosSecure = useAxiosSecure();
    const [imageError, setImageError] = useState("");

    const validateImage = (file) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                if (img.width <= 300 && img.height <= 300) {
                    resolve(true);
                } else {
                    reject("Image dimensions must be 300x300 pixels or smaller");
                }
            };
            img.onerror = () => reject("Invalid image file");
            img.src = URL.createObjectURL(file);
        });
    };

    const onSubmit = async (data) => {
        setImageError("");
        const photo = data.photo?.[0];


        try {
            await validateImage(photo); // Validate image dimensions

            const imageData = await imageUpload(photo);
            const foodInfo = {
                foodName: data.foodName,
                photo: imageData?.data?.display_url || "",
                category: data.category,
                price: parseFloat(data.price),
            };

            axiosSecure.post("/foods", foodInfo)
                .then(res => {
                    console.log(res.data);
                    if(res.data.insertedId){
                        toast.success("Successfully added Food")
                    }
                });
        } catch (error) {
            setImageError(error); // Set image error if validation fails
        }
    };

    return (
        <div className="min-h-screen py-8 bg-gray-50">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Add Your Food</h2>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                        {/* Food Image */}
                        <div>
                            <label className="block text-gray-600 font-semibold mb-2">Food Image (300x300 or smaller)</label>
                            <input
                                type="file"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition"
                                name="photo"
                                accept="image/*"
                                {...register("photo", { required: true })}
                            />
                            {errors.photo && <span className="text-red-600 text-sm">This field is required</span>}
                            {imageError && <span className="text-red-600 text-sm">{imageError}</span>}
                        </div>

                        {/* Food Name */}
                        <div>
                            <label className="block text-gray-600 font-semibold mb-2">Food Name</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition"
                                placeholder="Enter food name"
                                {...register("foodName", { required: true, minLength: 4, maxLength: 15 })}
                            />
                            {errors.foodName && <span className="text-red-600 text-sm">This field is required</span>}
                            {errors.foodName?.type === 'minLength' && <span className="text-red-600 text-sm">Must be at least 4 characters</span>}
                            {errors.foodName?.type === 'maxLength' && <span className="text-red-600 text-sm">Cannot exceed 15 characters</span>}
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-gray-600 font-semibold mb-2">Price</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition"
                                placeholder="Enter price"
                                {...register("price", { required: true })}
                            />
                            {errors.price && <span className="text-red-600 text-sm">This field is required</span>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-gray-600 font-semibold mb-2">Category</label>
                            <select
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition"
                                {...register("category", { required: true })}
                            >
                                <option value="">Select Category</option>
                                <option>Biryani</option>
                                <option>Pizza</option>
                                <option>Burger</option>
                                <option>Cake</option>
                                <option>Juice</option>
                                <option>Chinese</option>
                                <option>Chicken</option>
                                <option>Beef</option>
                            </select>
                            {errors.category && <span className="text-red-600 text-sm">This field is required</span>}
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                                Add Food
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFoods;
