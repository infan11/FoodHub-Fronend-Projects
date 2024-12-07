import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
const Register = () => {
    const { register, handleSubmit, watch, formState: { errors }, } = useForm()
    const onSubmit = event => {
        console.log(event);
    }
    return (
        <div className="">
            <div className="hero  min-h-screen  max-w-7xl mx-auto md:px-5">
                <div data-aos="zoom-in" className=" grid md:grid-cols-2 rounded-r-2xl shadow-2xl">
                    <div className="text-center hidden sm:block ">
                        <img className=" md:w-[650px] md:h-[600px] lg:w-[685px] lg:h-[685px]   rounded-l-2xl" src="https://i.ibb.co.com/TqjSXw8/Register.png" alt="" />
                    </div>
                    <div className="  lg:w-full bg-white shrink-0 rounded-r-2xl shadow-2xl">
                        <div className="card-body">
                            <Card color="  transparent" className="" shadow={false}>
                                <p className="text-2xl font-extrabold text-center mb-3 transition-all "> SIGNIN </p>



                                <form onSubmit={handleSubmit(onSubmit)} className="mt-3 mb-2 w-80 mx-auto max-w-screen-lg sm:w-80">
                                    <div className="mb-1 flex flex-col gap-6">

                                        <Input size="lg"
                                            name="name"
                                            type="name"
                                            label="Your Name"
                                            {...register("name", { required: true })}

                                        />
                                        {errors.name && <span className="text-red-600 text-sm font-bold">This field is required</span>}

                                        <Input
                                            size="lg"
                                            name="email"
                                            type="email"
                                            label="Your Email"
                                            {...register("email", { required: true })}
                                        />
                                        {errors.email && <span className="text-red-600 text-sm font-bold">This field is required</span>}

                                        <Input
                                            type="password"
                                            name="password"
                                            size="lg"
                                            placeholder="********"
                                            className=""
                                            label="Password"
                                            {...register("password",  {required : true,  minLength: 6, maxLength: 8  })}
                                        />
                                        {errors.password?.type && <span className="text-red-600">This field is reqiure</span>}
                                        {errors.password?.type === 'minLength' && <span className="text-red-600">This pass must 6 Characters</span>}
                                        {errors.password?.type === 'maxLength' && <span className="text-red-600">This pass only 8 Characters</span>}
                                    </div>
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
                                        sign in
                                    </button>
                                    <div className="divider">OR</div>
                                </form>

                                <div className=" mx-auto "> <button className="flex text-[14px] items-center font-bold btn rounded-full"><FcGoogle /> Continue With Google</button></div>
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

export default Register;