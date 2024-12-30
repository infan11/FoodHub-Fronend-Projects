import { Helmet } from "react-helmet";
import useAuth from "../../Hooks/useAuth";
import { Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser"; // Import EmailJS

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const emailRef = useRef();
  const { register, formState: { errors } } = useForm();


  const haandleResetPassword = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;

    if (!email) {
      console.log("Provide your email");
      return;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      console.log("Please type a valid email");
      return;
    }

    try {

      await resetPassword(email);
      toast.success("Password reset email sent! Please check your email.");

    
      await sendConfirmationEmail(email);

      setTimeout(() => {
        window.location.href = "https://mail.google.com/mail/u/0/?hl=en-GB#inbox";
      }, 500);
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Error: " + error.message);
    }
  };
  
  const sendConfirmationEmail = async (email) => {
    try {
      await emailjs.send(
        `${import.meta.env.VITE_SERVICEID}`, 
        `${import.meta.env.VITE_TEMPLATECODE}`, 
        {
          user_email: email, 
        },
        `${import.meta.env.  VITE_USERID}`
      );
      console.log("Notification email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error.message);
      toast.error("Failed to send confirmation emaill");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-10 flex min-h-screen justify-center items-center">
      <Helmet>
        <title>Enter Your Email</title>
      </Helmet>
      <div className="border-4 w-full mx-auto p-5 px-2 shadow-2xl">
        <p className="text-3xl text-center font-bold">Reset Your Password</p>
        <form onSubmit={haandleResetPassword} className="mt-5 mx-auto">
          <div className="sm:w-[200px] md:w-[280px] lg:w-[500px] mx-auto font-bold">
            <Input
              label="Type Your Email"
              placeholder="Type Your Email"
              inputRef={emailRef}
              color="orange"
              className="text-red-500"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-600 text-sm font-bold">
                This field is required
              </span>
            )}
          </div>
          <div className="w-56 mx-auto mt-4 shadow-2xl">
            <button className="btn rounded px-4 ml-7 bg-[#f79f48] hover:bg-[#f79f48] text-white">
              Send Your Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
