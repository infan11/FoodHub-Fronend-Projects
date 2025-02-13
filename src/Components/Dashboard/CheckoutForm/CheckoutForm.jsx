

import { Input, Textarea } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdDeleteOutline } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import Select from "react-select";
import { FaCcStripe } from "react-icons/fa6";
import {
    Radio,
    Card,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from "@material-tailwind/react";
import { Helmet } from 'react-helmet';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAddFood from '../../Hooks/useAddFood';
import useAuth from '../../Hooks/useAuth';
const CheckoutForm = () => {
    const navigate = useNavigate()

    const axiosSecure = useAxiosSecure();
    const [stateOptions, setStateOptions] = useState([]);
    const [localCountry, setLocalCountry] = useState(null);
    const [selectedStateCategory, setStateProductCategory] = useState(null);
    const [districtOption, setDistrictOption] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [loading, setLoading] = useState(false);
    const [quantities, setQuantities] = useState({});
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [cartFood, refetch] = useAddFood();
    const { user } = useAuth();
    useEffect(() => {
        setLoading(true);
        let options = [];
        if (localCountry?.value === "Bangladesh") {
            options = [
                { value: "Dhaka", label: "Dhaka" },
                { value: "Chattogram", label: "Chattogram" },
                { value: "Khulna", label: "Khulna" },
                { value: "Barishal", label: "Barishal" },
                { value: "Sylhet", label: "Sylhet" },
                { value: "Rangpur", label: "Rangpur" },
                { value: "Rajshahi", label: "Rajshahi" }
            ];
        }

        const district = {
            Dhaka: [
                { value: "Dhaka", label: "Dhaka" },
                { value: "Faridpur", label: "Faridpur" },
                { value: "Gazipur", label: "Gazipur" },
                { value: "Gopalganj", label: "Gopalganj" },
                { value: "Kishoreganj", label: "Kishoreganj" },
                { value: "Madaripur", label: "Madaripur" },
                { value: "Manikganj", label: "Manikganj" },
                { value: "Munshiganj", label: "Munshiganj" },
                { value: "Mymensingh", label: "Mymensingh" },
                { value: "Narsingdi", label: "Narsingdi" },
                { value: "Narayanganj", label: "Narayanganj" },
                { value: "Tangail", label: "Tangail" },
                { value: "Shariatpur", label: "Shariatpur" },
                { value: "Netrokona", label: "Netrokona" }
            ],
            Chattogram: [
                { value: "Chattogram", label: "Chattogram" },
                { value: "Bandarban", label: "Bandarban" },
                { value: "Brahmanbaria", label: "Brahmanbaria" },
                { value: "Chandpur", label: "Chandpur" },
                { value: "Feni", label: "Feni" },
                { value: "Khagrachari", label: "Khagrachari" },
                { value: "Lakshmipur", label: "Lakshmipur" },
                { value: "Noakhali", label: "Noakhali" },
                { value: "Rangamati", label: "Rangamati" },
                { value: "Cox'sbazar", label: "Cox'sbazar" }
            ],
            Khulna: [
                { value: "Khulna", label: "Khulna" },
                { value: "Bagerhat", label: "Bagerhat" },
                { value: "Chuadanga", label: "Chuadanga" },
                { value: "Jessore", label: "Jessore" },
                { value: "Jhenaidah", label: "Jhenaidah" },
                { value: "Kushtia", label: "Kushtia" },
                { value: "Meherpur", label: "Meherpur" },
                { value: "Mongla", label: "Mongla" },
                { value: "Satkhira", label: "Satkhira" }
            ],
            Barishal: [
                { value: "Barishal", label: "Barishal" },
                { value: "Barguna", label: "Barguna" },
                { value: "Bhola", label: "Bhola" },
                { value: "Jhalokathi", label: "Jhalokathi" },
                { value: "Patuakhali", label: "Patuakhali" },
                { value: "Pirojpur", label: "Pirojpur" },

            ],
            Sylhet: [
                { value: "Sylhet", label: "Sylhet" },
                { value: "Habiganj", label: "Habiganj" },
                { value: "Moulvibazar", label: "Moulvibazar" },
                { value: "Sunamganj", label: "Sunamganj" },
                { value: "Mymensingh", label: "Mymensingh" },
            ],
            Rangpur: [
                { value: "Rangpur", label: "Rangpur" },
                { value: "Dinajpur", label: "Dinajpur" },
                { value: "Gaibandha", label: "Gaibandha" },
                { value: "Kurigram", label: "Kurigram" },
                { value: "Lalmonirhat", label: "Lalmonirhat" },
                { value: "Nilphamari", label: "Nilphamari" },
                { value: "Panchagarh", label: "Panchagarh" },
                { value: "Thakurgaon", label: "Thakurgaon" }, ,
            ],
            Rajshahi: [
                { value: "Rajshahi", label: "Rajshahi" },
                { value: "Bogra", label: "Bogra" },
                { value: "Chapai Nawabganj", label: "Chapai Nawabganj" },
                { value: "Naogaon", label: "Naogaon" },
                { value: "Natore", label: "Natore" },
                { value: "Pabna", label: "Pabna" },
                { value: "Rajshahi", label: "Rajshahi" },
                { value: "Rangpur", label: "Rangpur" },
                { value: "Shibganj", label: "Shibganj" },
            ]
        };

        setStateOptions(options);
        if (selectedStateCategory) {
            setDistrictOption(district[selectedStateCategory.value] || []);
        } else {
            setDistrictOption([]);
        }

        setLoading(false);
    }, [localCountry, selectedStateCategory]);

    const handleCategoryChange = (selectedOption) => {
        setLocalCountry(selectedOption);
        setValue("category", selectedOption?.value || null);
        setStateProductCategory(null);
        setSelectedDistrict(null);
    };

    const handleProductCategoryChange = (selectedOption) => {
        setStateProductCategory(selectedOption);
        setValue("state_category", selectedOption?.value || null);
        setSelectedDistrict(null);
    };

    const handleDistrictChange = (selectedOption) => {
        setSelectedDistrict(selectedOption);
        setValue("district", selectedOption?.value || null);
    };

    const onSubmit = (data) => {
        // // console.log(data);
        const CheckoutFormItems = {
            name: data.name,
            category: localCountry?.value,
            state_category: data.state_category,
            district: data.district,
            CheckoutFormEmail: data.email,
            address: data.address,
            contactNumber: parseFloat(data.contactNumber)


        };
        // // console.log(CheckoutFormItems);
        axiosSecure.post("/CheckoutForm", CheckoutFormItems)
            .then(res => {
                // // console.log(res.data);
                if (res.data.insertedId) {
                    toast.success("Payment Please")
                }
                navigate("/dashboard/payment")

            })

    };

    // Calculate Subtotal
    const subtotal = cartFood.reduce((acc, item) => {
        const quantity = quantities[item._id] || 1;
        return acc + item.foodPrice * quantity;
    }, 0);

    const discount = subtotal * 0.15; // 15% discount
    const total = subtotal - discount;


    const handleRemove = (id) => {
        if (user && user.email) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/addFood/${id}`)
                        .then(res => {
                            // console.log(res.data);
                            refetch()
                            if (res.data.deletedCount > 0) {
                                refetch()
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success",
                                    color: "red"
                                });
                            }
                        })
                }
            });
        }
    };

    return (
        <div >
            <Helmet>
                <meta charSet="utf-8" />
                <title>DASHOBARD | CheckoutForm</title>

            </Helmet>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div>
                    <div style={{ backgroundImage: "url()" }} className="  min-h-screen  hero">
                        <div className="hero-content grid md:grid-cols-2 md:gap-5 lg:flex-row-reverse justify-between  ">
                            <div className="  w-full  mx-auto  items-baseline  rounded-md ">
                                <form className="card-body">

                                    <br />
                                    <div className="form-control">
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border rounded-full focus:ring-2 text-[#ff1818] focus:ring-red-400 outline-none transition"
                                            placeholder="Enter restaurant name"
                                            {...register("restaurantName", { required: true, minLength: 1, maxLength: 20 })}
                                            readOnly
                                        />
                                        {errors.name && <span className="text-[#ff1818]">This field is required</span>}
                                        <br />
                                        <div className='md:flex gap-2'>
                                            <Input type="email" color='green' size="lg" label="Email" name="email" {...register("email", { required: true })} className="text-green-400" />
                                            {errors.email && <span className="text-[#ff1818]">This field is required</span>}

                                            <br />
                                            <Input
                                                maxLength={11}
                                                label="Contact Number"
                                                {...register("contactNumber", { required: true })}
                                                placeholder="e.g., +1 123-456-7890"
                                                color='green'
                                                pattern="^\+\d{1,3}\s\d{1,4}-\d{1,4}-\d{4}$"
                                                className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                icon={
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="h-4 w-4 text-green-400"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                                                            clip-rule="evenodd"
                                                        />
                                                    </svg>
                                                }

                                            />
                                            {errors.contactNumber && <span className="text-[#ff1818]">This field is required</span>}
                                        </div>
                                        <div className="md:flex gap-3 mt-3">
                                            <Select
                                                placeholder="Select Country"
                                                options={[
                                                    { value: "Afghanistan", label: "Afghanistan" },
                                                    { value: "Albania", label: "Albania" },
                                                    { value: "Algeria", label: "Algeria" },
                                                    { value: "Andorra", label: "Andorra" },

                                                    { value: "Bahamas", label: "Bahamas" },
                                                    { value: "Bahrain", label: "Bahrain" },
                                                    { value: "Bangladesh", label: "Bangladesh" },
                                                    { value: "Barbados", label: "Barbados" },
                                                    { value: "Belarus", label: "Belarus" },
                                                    { value: "Belgium", label: "Belgium" },
                                                    { value: "Belize", label: "Belize" },
                                                    { value: "Benin", label: "Benin" },
                                                    { value: "Bhutan", label: "Bhutan" },
                                                    { value: "Bolivia", label: "Bolivia" },
                                                    { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
                                                    { value: "Botswana", label: "Botswana" },
                                                    { value: "Brazil", label: "Brazil" },
                                                    { value: "Brunei", label: "Brunei" },
                                                    { value: "Bulgaria", label: "Bulgaria" },
                                                    { value: "Burkina Faso", label: "Burkina Faso" },
                                                    { value: "Burundi", label: "Burundi" },
                                                    { value: "Cabo Verde", label: "Cabo Verde" },
                                                    { value: "Cambodia", label: "Cambodia" },
                                                    { value: "Cameroon", label: "Cameroon" },
                                                    { value: "Canada", label: "Canada" },

                                                ]}
                                                value={localCountry}
                                                onChange={handleCategoryChange}
                                                isClearable
                                                className='w-full text-gray-700'
                                            />
                                            <br />
                                            <Select
                                                placeholder="Select State"
                                                options={stateOptions}
                                                value={selectedStateCategory}
                                                onChange={handleProductCategoryChange}
                                                isDisabled={loading || stateOptions.length === 0}
                                                isClearable
                                                className='w-full text-gray-800'
                                            />
                                        </div>
                                        <br />

                                        <div>
                                            <Select
                                                placeholder="Select Product District"
                                                value={selectedDistrict}
                                                options={districtOption}
                                                onChange={handleDistrictChange}
                                                isDisabled={!selectedStateCategory}
                                                isClearable
                                                className='text-gray-800'
                                            />


                                        </div>



                                    </div>
                                    <br />
                                    <Input color='green' type="text" size="lg" label="Upzila Name" name="upzilaName" {...register("upzilaName", { required: true })} className=" text-green-400" />
                                    {errors.upzilaName && <span className="text-[#ff1818]">This field is required</span>}
                                    <br />


                                    <div className="w-full">
                                        <Textarea color='green' label="Full Address" className='text-green-400' name='address' {...register("address", { required: true })} />
                                        {errors.address && <span className="text-[#ff1818]">This field is required</span>}
                                    </div>





                                </form>

                            </div>
                            {/* order */}
                            <div className="text-center max-w-6xl  md:px-0 lg:text-left">
                                <div className="mb-11">
                                    <table className="table border-gray-500 rounded-md border-2">

                                        <tbody>
                                            {cartFood.map((item, index) => (
                                                <tr key={index}>

                                                    <td className='p-4  border-2 border-gray-300  w-[700px]  '>
                                                        <div className="flex md:flex  items-center gap-7">
                                                            <div className="avatar">
                                                                <div className="h-16 w-16  md:mr-0 rounded-md overflow-hidden">
                                                                    <img
                                                                        src={item.
                                                                            foodImage}
                                                                        alt={item.restaurantName}

                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className='mr-20 md:mr-0'>
                                                                <p className="font-bold flex text-[10px] md:text-[10px]">{item.foodName}
                                                                    <div className="badge ml-3 text-[8px]">×{item.quantity}</div>
                                                                </p>
                                                                {/* {
                                                                    mensProduct ? <> <p className='font-bold text-gray-600'>  {item.size}</p> </> : <>
                                                                    </>
                                                                } */}

                                                                <div className="flex gap-8 mb-4">
                                                                    <p className="font-bold text-[12px]">${item.foodPrice}.00</p>

                                                                </div>
                                                                <button onClick={() => handleRemove(item._id)} className="text-red-600 text-sm font-semibold mt-1 hover:underline">
                                                                    <MdDeleteOutline />
                                                                </button>

                                                            </div>
                                                        </div>
                                                    </td>






                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <div className="mt-6 md:px-20">
                                        <div className="divider ml-4 divider-error mx-auto"></div>

                                        <div className="flex justify-evenly md:justify-end gap-12">
                                            <p className="text-center">Subtotal</p>
                                            <p className="text-center">${subtotal.toFixed(2)}</p>
                                        </div>

                                        <div className="flex justify-evenly md:justify-end gap-12">
                                            <p className="text-center">Discount (15%)</p>
                                            <p className="text-center">${discount.toFixed(2)}</p>
                                        </div>

                                        <div className="flex justify-evenly md:justify-end gap-12">
                                            <p className="text-center mr-4">Total</p>
                                            <p className="text-center ml-3 font-bold text-[#ff1818]">${total.toFixed(2)} </p>
                                        </div>
                                    </div>
                                    <Card>
                                        <List>

                                            <ListItem className="p-0">
                                                <label
                                                    htmlFor="vertical-list-vue"
                                                    className="flex w-full cursor-pointer items-center px-3 py-2"
                                                >
                                                    <ListItemPrefix className="mr-3">
                                                        <Radio
                                                            name="vertical-list"
                                                            id="vertical-list-vue"
                                                            ripple={false}
                                                            className="hover:before:opacity-0"
                                                            containerProps={{
                                                                className: "p-0",
                                                            }}
                                                        />
                                                    </ListItemPrefix>
                                                    <Typography
                                                        color="blue-gray"
                                                        name="onlinePayment"
                                                        className="font-medium  flex items-center gap-3"
                                                    >
                                                        Online Payment <FaCcStripe />
                                                    </Typography>
                                                </label>
                                            </ListItem>

                                        </List>
                                    </Card>
                                    <div className='px-3 md:px-1'>

                                        <button className='btn  w-full mt-4  btn-outline bg-orange-900 text-white'>Payment</button>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default CheckoutForm;
