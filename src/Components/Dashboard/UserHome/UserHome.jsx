import useAuth from "../../Hooks/useAuth";

const UserHome = () => {
    const {user} = useAuth();
    return (
        <div>
       
        user : {user?.name || user?.displayName}
         <br />
         user Email : {user?.email}
        </div>
    );
};

export default UserHome;                           