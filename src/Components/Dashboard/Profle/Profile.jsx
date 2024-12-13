import React from 'react';

const Profile = () => {
    const { createUser, googleAuth, user, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit,  formState: { errors }, } = useForm()
    return (
        <div>
            <p className='text-center text-2xl  font-extrabold'> 
              Create Your Profile</p>
        </div>
    );
};

export default Profile;