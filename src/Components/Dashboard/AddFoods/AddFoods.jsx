import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { imageUpload } from '../../Hooks/imageHooks';
import toast from 'react-hot-toast';
import { MdCloudUpload } from 'react-icons/md';

const AddFoods = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const [imageError, setImageError] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const validateImage = (file) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const reader = new FileReader();
            
            reader.onloadend = () => {
                img.onload = () => {
                    if (img.width <= 300 && img.height <= 300) {
                        resolve(true); 
                    } else {
                        reject("Image dimensions must be 300x300 pixels or smaller");
                    }
                };
                img.onerror = () => reject("Invalid image file");
                img.src = reader.result;
            };
    
            reader.readAsDataURL(file);
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

    // Handle image selection and preview
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Set preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    return (
        <div className="min-h-screen py-8 bg-gray-50">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Add Your Food</h2>
            <div className="max-w-3xl mx-auto bg-white rounded-full shadow-lg p-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                        {/* Food Image */}
                        <div>
                            <div className="flex items-center justify-center">
                                <div className="relative w-[200px] h-[200px] flex items-center justify-center border-4 border-dashed rounded-full cursor-pointer">
                                    <input 
                                        type="file" 
                                        id="fileInput" 
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        name="photo"
                                        accept="image/*"
                                        {...register("photo", { required: true })}
                                        onChange={handleImageChange} // Handle image change
                                    />
                                    <label 
                                        htmlFor="fileInput" 
                                        className="flex items-center justify-center w-[200px] h-[200px] text-[#ff1818] "
                                    >
                                        <MdCloudUpload size={20} className="mr-2" />
                                        Upload File
                                    </label>
                                </div>
                            </div>
                            {errors.photo && <span className="text-[#ff1818]  text-sm text-center">This field is required</span>}
                            {imageError && <span className="text-[#ff1818]  text-sm text-center">{imageError}</span>}
                            
                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="mt-4">
                                    <img 
                                        src={imagePreview} 
                                        alt="Preview" 
                                        className="w-[150px] mx-auto h-auto rounded-full object-cover" 
                                    />
                                </div>
                            )}
                        </div>

                        {/* Food Name */}
                        <div>
                            <label className="block text-gray-600 font-semibold mb-2">Food Name</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-full focus:ring-2 text-[#ff1818]  focus:ring-red-400 outline-none transition"
                                placeholder="Enter food name"
                                {...register("foodName", { required: true, minLength: 4, maxLength: 15 })}
                            />
                            {errors.foodName && <span className="text-[#ff1818]  text-sm">This field is required</span>}
                            {errors.foodName?.type === 'minLength' && <span className="text-[#ff1818]  text-sm">Must be at least 4 characters</span>}
                            {errors.foodName?.type === 'maxLength' && <span className="text-[#ff1818]  text-sm">Cannot exceed 15 characters</span>}
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-gray-600 font-semibold mb-2">Price</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border rounded-full text-[#ff1818]  focus:ring-2 focus:ring-red-400 outline-none transition"
                                placeholder="Enter price"
                                {...register("price", { required: true })}
                            />
                            {errors.price && <span className="text-[#ff1818]  text-sm">This field is required</span>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-gray-600 font-semibold mb-2">Category</label>
                            <select
                                className="w-full px-3 py-2 border rounded-full text-[#ff1818]  focus:ring-2  focus:ring-red-400 outline-none transition"
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
                            {errors.category && <span className="text-[#ff1818]  text-sm">This field is required</span>}
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[#ff1818 ] text-white font-semibold rounded-full hover:bg-[#ff1818 ] transition focus:outline-none focus:ring-2 focus:ring-red-400 w-full"
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
