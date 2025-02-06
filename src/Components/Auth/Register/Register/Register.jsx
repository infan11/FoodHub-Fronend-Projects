import {
    Card,
    Input,
    Checkbox,
    Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Register = () => {
    const { createUser, googleAuth, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log("Form Data:", data);

            const res = await createUser(data.email, data.password);
            if (!res || !res.user) {
                throw new Error("User creation failed");
            }

            await updateUserProfile(data.displayName, null);
            await res.user.reload();
            console.log("Updated User:", res.user);

            const usersInfo = {
                name: data.displayName,
                email: data.email,
                role: "guest",
                status: "Verified",
            };

            await toast.promise(
                axiosSecure.put("/users", usersInfo),
                {
                    loading: "Loading...",
                    success: `Successfully registered ${data.displayName}`,
                    error: <b>Could not save user.</b>,
                }
            );

            navigate(from, { replace: true });
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error("Registration failed. Please try again.");
        }
    };

    const handleGoogle = async () => {
        try {
            const res = await googleAuth();
            if (!res || !res.user) {
                throw new Error("Google sign-in failed");
            }

            const usersInfo = {
                email: res.user.email,
                name: res.user.displayName,
                role: "guest",
                status: "Verified",
            };

            await toast.promise(
                axiosSecure.put("/users", usersInfo),
                {
                    loading: "Loading...",
                    success: `Successfully Signed in ${res.user.displayName || "User"}`,
                    error: <b>Could not save user.</b>,
                }
            );

            navigate(from, { replace: true });
        } catch (error) {
            console.error("Google sign-in error:", error);
            toast.error("Google sign-in failed.");
        }
    };

    return (
        <div className="hero min-h-screen max-w-7xl mx-auto md:px-5">
            <div data-aos="zoom-in" className="grid md:grid-cols-2 rounded-r-2xl shadow-2xl">
                <div className="text-center hidden sm:block">
                    <img className="md:w-[650px] md:h-[600px] lg:w-[685px] lg:h-[685px] rounded-l-2xl"
                        src="https://i.ibb.co/TqjSXw8/Register.png" alt="Register"
                    />
                </div>
                <div className="lg:w-full bg-white shrink-0 rounded-r-2xl shadow-2xl">
                    <div className="card-body">
                        <Card color="transparent" shadow={false}>
                            <p className="text-2xl font-extrabold text-center mb-3">SIGN IN</p>
                            <form onSubmit={handleSubmit(onSubmit)} className="mt-3 mb-2 w-80 mx-auto">
                                <div className="mb-1 flex flex-col gap-6">
                                    <Input size="lg" type="text" label="Your Name"
                                        {...register("displayName", { required: true })} />
                                    {errors.displayName && <span className="text-red-500 text-sm font-bold">This field is required</span>}

                                    <Input size="lg" type="email" label="Your Email"
                                        {...register("email", { required: true })} />
                                    {errors.email && <span className="text-red-500 text-sm font-bold">This field is required</span>}

                                    <Input type="password" size="lg" placeholder="********" label="Password"
                                        {...register("password", { required: true, minLength: 6, maxLength: 8 })} />
                                    {errors.password?.type && <span className="text-red-500">This field is required</span>}
                                    {errors.password?.type === "minLength" && <span className="text-red-500">Password must be at least 6 characters</span>}
                                    {errors.password?.type === "maxLength" && <span className="text-red-500">Password must not exceed 8 characters</span>}
                                </div>

                                <Checkbox
                                    label={
                                        <Typography variant="small" color="gray" className="flex items-center font-normal">
                                            I agree to the
                                            <a href="#" className="font-medium transition-colors hover:text-gray-900">
                                                &nbsp;Terms and Conditions
                                            </a>
                                        </Typography>
                                    }
                                />

                                <Typography color="gray" className="mt-4 text-center font-normal">
                                    Food Seller? <a href="/restaurantRegister" className="font-medium text-gray-900">Sign up</a>
                                </Typography>

                                <button type="submit" className="w-full uppercase bg-[#ff1818] text-white mt-2 btn rounded-badge">
                                    Sign In
                                </button>


                            </form>
                            <div className="divider">OR</div>

                            <button onClick={handleGoogle} className="flex text-[14px] bg-white items-center font-bold btn rounded-full">
                                <FcGoogle /> Continue With Google
                            </button>

                            <Typography color="gray" className="mt-4 text-center font-normal">
                                Already have an account? <a href="/login" className="font-medium text-gray-900">Log in</a>
                            </Typography>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
