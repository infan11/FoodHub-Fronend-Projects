import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { FcGoogle } from "react-icons/fc";
const Register = () => {
    return (
        <div className="bg-[#ea9540fd]">
          <div className="hero  min-h-screen  max-w-7xl mx-auto">
  <div data-aos="zoom-in" className=" grid md:grid-cols-2 rounded-r-2xl shadow-2xl">
    <div className="text-center ">
     <img className="w-[500px] h-[500px] rounded-l-2xl" src="https://i.ibb.co.com/TqjSXw8/Register.png" alt="" />
    </div>
    <div className="  w-full bg-white shrink-0 rounded-r-2xl shadow-2xl">
      <form className="card-body">
      <Card color="transparent" shadow={false}>
     
     
      <form className="mt-3 mb-2 w-80 mx-auto max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
    
          <Input
            size="lg"
            name="name"
            className=" "
            label="Your Name"
            
          />
        
          <Input
            size="lg"
            name="email"
            className=" "
          label="Your Email"
          />
      
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className=" "
          label="Password"
          />
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
        <Button className="mt-2" fullWidth>
          sign up
        </Button>
        <div className="divider">OR</div>
           <div className="w-72 mx-auto ml-20"> <button className="flex text-[14px] items-center font-bold btn rounded-full"><FcGoogle /> Continue With Google</button></div>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-gray-900">
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default Register;